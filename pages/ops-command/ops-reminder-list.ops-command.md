---
id: 8734588b-915d-569f-b8a2-41e08a2e7d85
page-type-slug: ops-command
title: "Ops reminder list"
slug: ops-reminder-list
domain-parent-slug: domain/ops-reminder
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/reminder/list.ts
path: reminder list
---

# Definition

- **Ops reminder list** — the reminders a seat set itself, each with its next firing.

# Help

Every reminder this seat set for itself, with what systemd says its next firing
is. A reminder somebody else addressed to this seat is not one it arranged, so it
does not stand here.

The next firing is asked of systemd at the moment you run this, rather than read
off what the clock last armed, so it answers for the schedule as written.
