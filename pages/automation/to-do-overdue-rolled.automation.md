---
page-type-slug: automation
id: 019e887a-b9d6-70f7-980e-2a7c16c3aac8
title: To-do overdue rolled
slug: to-do-overdue-rolled
enabled: true
trigger: "{\"kind\":\"schedule\",\"resetDomain\":\"eso-na\",\"rrule\":\"FREQ=DAILY\"}"
actions: "[{\"condition\":\"= parseCalendarDate(match.dueDate) < parseCalendarDate(today())\",\"kind\":\"patch_matching\",\"pageTypeSlug\":\"to-do\",\"set\":{\"dueDate\":\"=today()\"},\"where\":[{\"isNull\":true,\"key\":\"completedAt\"},{\"isNotEmpty\":true,\"key\":\"dueDate\"}]}]"
---

Moves every unfinished to-do whose due date has passed on to today, so nothing accumulates a backlog of dates.
