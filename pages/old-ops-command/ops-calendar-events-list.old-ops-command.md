---
id: c761d324-a9cd-5bbc-bab0-6e44b3d11b1f
page-type-slug: old-ops-command
title: "Ops calendar events list"
slug: ops-calendar-events-list
domain-parent-slug: domain/ops-calendar-events
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/calendar/events/list.ts
path: calendar events list
---

# Definition

- **Ops calendar events list** — the events one calendar holds in a time window, as JSON.

# Help

List calendar events in an optional time window. Emits a JSON array of normalized events to stdout. `--calendar` is optional; `primary` and unset both resolve to Alan's calendar.
