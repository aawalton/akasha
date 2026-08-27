---
page-type-slug: automation
id: 019e838b-0c3c-7eed-8a01-6f80dcfe2a9e
title: Daily tracking opened
slug: daily-tracking-opened
enabled: false
trigger: "{\"kind\":\"schedule\",\"resetDomain\":\"eso-na\",\"rrule\":\"FREQ=DAILY\"}"
actions: "[{\"kind\":\"create_page\",\"pageTypeSlug\":\"daily-tracking\",\"properties\":{\"title\":\"=\\\"@date:\\\" + today()\",\"userId\":\"9ba554f7-cb18-48bb-a709-ec935a895ca7\"}}]"
---

Opens the day's tracking page at the ESO reset, unless the day already has one.
