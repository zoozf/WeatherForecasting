function submit(){

   let input = document.getElementById("input-field").value;
   input = typeof(input) === 'string' && input.trim().length > 0 ? input.trim() : '';

   let geocodeURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + input + "&limit=5&appid={API key}";

   fetch(geocodeURL)
        .then(response => response.json())
        .then(data => {

           let lat = data[0].lat;
           let lon = data[0].lon;

           let currWeatherURL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid=ad2b911c4edf6ed28188143b7ccf92a1"
           fetch(currWeatherURL)
               .then(response => response.json())
               .then(data => {
                   displayResult();
                   document.getElementById("result").innerHTML = "<h4>" + data.weather[0].description + "</h4>" +
                       "<p> Current Temperature: " + data.main.temp + "°C <br>" +
                       "Feels like: " + data.main.feels_like + "°C <br>" +
                       "Wind speed: " + data.wind.speed + "m/s </p>"
               }).catch(displayError)
        })
       .catch(displayError);
}

function displayResult(){
    document.getElementById("result").style.display = 'block'
}

function displayError(){
    displayResult()
    document.getElementById("result").innerHTML = "Please enter a valid location."
}