---
id: 208404c2-c227-5516-85da-498a7358957f
page-type-slug: domain
title: "Ops temper watcher"
slug: ops-temper-watcher
domain-parent-slug: domain/ops-temper
required-reading-slugs:
  - domain/ops-namespace
  - domain/temper
---

# Definition

- **Ops temper watcher** — the commands that bring the workstation's import daemon up or down and read what it wrote down.

# Design

systemd is the supervisor. Start, stop and restart act on a user unit, and the service document settles what that unit runs.

One daemon stands for the whole workstation. The state file the service writes carries the start time status reports, and systemd carries the rest.

A deploy that changed the daemon's own code fires the restart. Nothing here is scheduled.
