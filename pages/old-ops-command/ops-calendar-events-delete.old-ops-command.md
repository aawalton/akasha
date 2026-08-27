---
id: eb606292-01bf-505f-9cc8-75c351469b70
page-type-slug: old-ops-command
title: "Ops calendar events delete"
slug: ops-calendar-events-delete
domain-parent-slug: domain/ops-calendar-events
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/calendar/events/delete.ts
path: calendar events delete
irreversible: true
---

# Definition

- **Ops calendar events delete** — one calendar event removed from its calendar by id.

# Help

Delete a calendar event by id. Emits a `{ deleted, eventId }` JSON confirmation to stdout. `--calendar` is optional; `primary` and unset both resolve to Alan's calendar.
