---
id: d0098300-129e-5f68-8742-2f1d53f11ef4
page-type-slug: page-query
title: "Sleep hours on day"
page-type: daily-tracking
takes:
  date: calendar-date
where:
  date:
    is: $date
function: sum
target: sleep-hours
---
