---
id: 7d7755c6-9327-5175-a87c-3fdd9c7c7a4d
page-type-slug: old-ops-command
title: "Ops calendar events rsvp"
slug: ops-calendar-events-rsvp
domain-parent-slug: domain/ops-calendar-events
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/calendar/events/rsvp.ts
path: calendar events rsvp
irreversible: true
---

# Definition

- **Ops calendar events rsvp** — Alan's own response on one event, set without touching any other guest's.

# Help

Set Alan's own response on a calendar event (accept / decline / tentative). Authenticates as Alan via the OAuth-as-Alan client (run `ops calendar auth login` once first), reads the event, flips only his attendee's responseStatus, and writes the full attendee list back so no other guest's response is touched. Emits the normalized event as JSON to stdout. `--calendar` is optional; `primary` and unset both resolve to Alan's calendar.
