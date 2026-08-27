---
id: b107916f-3367-5290-a46d-a2a383e81f77
slug: surplus-hours-on-day
page-type-slug: page-query
title: "Surplus hours on day"
page-type: daily-tracking
takes:
  date: calendar-date
where:
  date:
    is: $date
function: sum
target: surplus-hours
---
