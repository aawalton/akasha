---
id: 649f094c-b1c7-509d-88fc-eb2003a62610
page-type-slug: domain
title: "Ops temper"
slug: ops-temper
domain-parent-slug: domain/temper
required-reading-slugs:
  - domain/ops-namespace
sequence-slugs:
  - domain/ops-temper-catalog
  - domain/ops-temper-inventory
  - domain/ops-temper-auto-quest
  - domain/ops-temper-errors
  - domain/ops-temper-watcher
  - domain/ops-temper-addon
  - domain/ops-temper-community-addon
  - package/temper-shared-capture-errors-decision-core
  - package/temper-scripts
settled: true
---

# Definition

- **Ops temper** — the parts of Temper that run in a terminal.

# Design

`ops temper` names no command of its own. Every command under it sits in a further namespace.

No command here reaches the running game. One that reads what an addon saw reads the file the addon flushed on `/reloadui` or `/quit`, so the answer is as old as that flush.

A command that touches a file on the workstation defaults to the live ESO install and takes a flag to point it elsewhere.
