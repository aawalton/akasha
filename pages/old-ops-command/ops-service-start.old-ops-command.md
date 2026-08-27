---
id: bf15da65-080a-5b4d-9b27-bd0bd49ebf87
page-type-slug: old-ops-command
title: "Ops service start"
slug: ops-service-start
domain-parent-slug: domain/ops-service
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/service/start.ts
path: service start
irreversible: false
---

# Definition

- **Ops service start** — one workstation service set running, named by the document that describes it.

# Help

Start one workstation service, named by its document rather than by a unit path.

A scheduled service starts its TIMER, which is what makes it run again; a
resident one starts its service. A name no document carries is refused with
what does stand, rather than passed to systemd to fail there.

This does not change whether the service comes back after a reboot. That is
`enabled:` on its document, carried out by `ops service install`.
