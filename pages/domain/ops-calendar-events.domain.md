---
id: 5cd29c67-b443-54dc-918f-9aeefeba89a4
page-type-slug: domain
title: "Ops calendar events"
slug: ops-calendar-events
domain-parent-slug: domain/ops-calendar
required-reading-slugs:
  - domain/ops-namespace
  - page-type/calendar-event
---

# Definition

- **Ops calendar events** — the commands that read, place, change, remove and answer one calendar event at a time.

# Design

`create`, `update` and `rsvp` notify everyone attending by default; `delete` takes no such flag and notifies nobody.

`get`, `update`, `delete` and `rsvp` each take the event's id as a bare first argument as well as under `--event`.
