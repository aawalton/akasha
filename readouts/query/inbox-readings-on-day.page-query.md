---
id: 3e704cc6-e892-5d9f-b0b7-54732a039ce7
slug: inbox-readings-on-day
page-type-slug: page-query
title: "Inbox readings on a day"
page-type: daily-tracking
takes:
  day: calendar-date
where:
  date:
    is: $day
limit: 1
keys:
  - date
  - inbox-tasks
  - inbox-tasks-cleared-today
  - inbox-temper-tasks
  - inbox-temper-tasks-cleared-today
  - inbox-texts
  - inbox-texts-cleared-today
---
