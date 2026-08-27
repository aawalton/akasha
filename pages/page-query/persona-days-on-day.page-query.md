---
id: f4c399f0-5726-50b3-b4e6-b79037f2ef8f
page-type-slug: page-query
title: "Persona days on day"
page-type: persona-day
takes:
  date: calendar-date
where:
  date:
    is: $date
keys:
  - persona-slug
  - date
  - points
limit: 1000
---
