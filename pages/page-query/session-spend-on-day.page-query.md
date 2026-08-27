---
id: 945d7adf-a76a-5108-9512-7f4f351a0d72
page-type-slug: page-query
title: "Session spend on day"
page-type: session-tracking
takes:
  date: calendar-date
where:
  daily-tracking-slug:
    is: $date
function: sum
target: spend-hours
---
