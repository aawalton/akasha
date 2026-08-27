---
id: d96207cd-159a-57de-ac68-acb3e178cb98
page-type-slug: ops-command
title: "Ops calendar events get"
slug: ops-calendar-events-get
domain-parent-slug: domain/ops-calendar-events
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/calendar/events/get.ts
path: calendar events get
---

# Definition

- **Ops calendar events get** — one calendar event named by its id, as JSON.

# Help

Fetch a single calendar event by id. Emits the normalized event as JSON to stdout. `--calendar` is optional; `primary` and unset both resolve to Alan's calendar.
