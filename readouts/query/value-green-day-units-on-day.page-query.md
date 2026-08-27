---
id: ccaee714-3005-56c4-a93e-336b24174e26
slug: value-green-day-units-on-day
page-type-slug: page-query
title: "Value green day units on day"
page-type: persona-day
takes:
  date: calendar-date
  value: text
where:
  date:
    is: $date
  value-slug:
    is: $value
function: sum
target: green-day-rung
---
