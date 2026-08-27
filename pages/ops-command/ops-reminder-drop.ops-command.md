---
id: 187df53a-f1cc-5a30-a226-3b8abdfcf74b
page-type-slug: ops-command
title: "Ops reminder drop"
slug: ops-reminder-drop
domain-parent-slug: domain/ops-reminder
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/reminder/drop.ts
path: reminder drop
irreversible: false
---

# Definition

- **Ops reminder drop** — one reminder taken back by the seat that set it.

# Help

Take one reminder away, named by the id `ops reminder list` prints.

This reaches only a reminder this seat set for itself. One addressed to this seat
by somebody else is theirs to withdraw, and an id naming one is refused rather
than taken.
