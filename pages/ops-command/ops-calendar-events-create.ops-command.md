---
id: 24c46798-a53d-50a3-b8a4-0bb7ec84d5d1
page-type-slug: ops-command
title: "Ops calendar events create"
slug: ops-calendar-events-create
domain-parent-slug: domain/ops-calendar-events
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/calendar/events/create.ts
path: calendar events create
irreversible: true
---

# Definition

- **Ops calendar events create** — a new event placed on a calendar as Alan, with an invite out to everyone named on it.

# Help

Create a calendar event as Alan via the OAuth-as-Alan client, so attendee invites actually send (run `ops calendar auth login` once first). Emits the normalized event as JSON to stdout. `--calendar` is optional; `primary` and unset both resolve to Alan's calendar. `--send-updates` defaults to all, emailing attendees their invites.
