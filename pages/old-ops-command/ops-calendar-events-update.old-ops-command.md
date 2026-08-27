---
id: d189e555-2992-5e01-892a-732c57dd17f7
page-type-slug: old-ops-command
title: "Ops calendar events update"
slug: ops-calendar-events-update
domain-parent-slug: domain/ops-calendar-events
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/calendar/events/update.ts
path: calendar events update
irreversible: true
---

# Definition

- **Ops calendar events update** — the fields named on one existing event, changed as Alan, with everyone attending told.

# Help

Patch fields of an existing calendar event as Alan via the OAuth-as-Alan client, so attendee updates actually send (run `ops calendar auth login` once first). Only the flags supplied are changed. Emits the normalized event as JSON to stdout. `--calendar` is optional; `primary` and unset both resolve to Alan's calendar. `--send-updates` defaults to all, emailing attendees the update.
