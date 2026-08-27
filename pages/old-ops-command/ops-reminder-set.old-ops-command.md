---
id: 00697258-05e0-5a2c-b5c0-db39d0005779
page-type-slug: old-ops-command
title: "Ops reminder set"
slug: ops-reminder-set
domain-parent-slug: domain/ops-reminder
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/reminder/set.ts
path: reminder set
irreversible: false
---

# Definition

- **Ops reminder set** — a message a seat schedules for itself.

# Help

Write a reminder addressed from this seat to itself. The clock turns it into a
message once its schedule comes due, and a message starts the seat it reaches.

The schedule is written the way systemd states a calendar, and systemd is what
reads it — `hourly`, `Mon..Fri 09:00`, or an absolute `2026-08-24 15:30` that
fires once and then takes its own page away. A schedule systemd will not read is
refused here rather than written, because a reminder nothing can parse would
stand forever without ever sending.

A reminder is armed on the clock's first sight of it rather than sent, so setting
one whose time has just passed does not fire it retroactively.
