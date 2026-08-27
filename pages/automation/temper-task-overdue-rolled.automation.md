---
page-type-slug: automation
id: 019e887a-ce0a-766f-bd13-ecb4244a14f6
title: Temper task overdue rolled
slug: temper-task-overdue-rolled
enabled: false
trigger: "{\"kind\":\"schedule\",\"resetDomain\":\"eso-na\",\"rrule\":\"FREQ=DAILY\"}"
actions: "[{\"condition\":\"= parseCalendarDate(match.dueDate) < parseCalendarDate(today())\",\"kind\":\"patch_matching\",\"pageTypeSlug\":\"temper-task\",\"set\":{\"dueDate\":\"=today()\"},\"where\":[{\"isNull\":true,\"key\":\"completedAt\"},{\"isNotEmpty\":true,\"key\":\"dueDate\"}]}]"
---

The same roll for temper tasks. Not enabled.
