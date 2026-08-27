---
id: ff1b74b2-0e87-5eff-8d23-1d8cd1450930
page-type-slug: ops-command
title: "Ops service stop"
slug: ops-service-stop
domain-parent-slug: domain/ops-service
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/service/stop.ts
path: service stop
irreversible: false
---

# Definition

- **Ops service stop** — one workstation service brought to a halt, named by the document that describes it.

# Help

Stop one workstation service, named by its document rather than by a unit path.

A scheduled service stops its timer AND the service beneath it, so a run
already under way is not left going after its schedule was stopped. A name no
document carries is refused with what does stand.

This does not change whether the service comes back after a reboot. Write
`enabled: false` on its document and run `ops service install` for that.
