---
id: b349b145-7b3e-5d86-914b-eb3900b85ba2
page-type-slug: ops-command
title: "Ops service restart"
slug: ops-service-restart
domain-parent-slug: domain/ops-service
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/service/restart.ts
path: service restart
irreversible: false
---

# Definition

- **Ops service restart** — one workstation service replaced by a run of what is on disk now.

# Help

Restart one workstation service, named by its document rather than by a unit path.

This is how a resident service picks up source that changed under it: the
worker is replaced by one reading what is on disk now. A scheduled service
restarts its TIMER, which re-arms the schedule without forcing a run — each
tick already starts a fresh process, so there is nothing stale to replace.

A name no document carries is refused with what does stand, rather than
passed to systemd to fail there.

This does not change whether the service comes back after a reboot. That is
`enabled:` on its document, carried out by `ops service install`.
