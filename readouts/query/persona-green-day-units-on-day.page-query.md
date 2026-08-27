---
id: 38051b3c-718b-5032-9cdc-97542999b039
page-type-slug: page-query
title: "Persona green day units on day"
page-type: persona-day
takes:
  date: calendar-date
  persona: text
where:
  date:
    is: $date
  persona-slug:
    is: $persona
function: sum
target: green-day-fraction
---
