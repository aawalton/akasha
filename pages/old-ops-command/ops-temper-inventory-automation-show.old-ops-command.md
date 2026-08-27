---
id: ca725bc2-fa4b-5510-bf28-98633751210a
page-type-slug: old-ops-command
title: "Ops temper inventory automation show"
slug: ops-temper-inventory-automation-show
domain-parent-slug: domain/ops-temper-inventory-automation
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/automation/show.ts
path: temper inventory automation show
---

# Definition

- **Ops temper inventory automation show** — every automation toggle that carries a value, beside the scope it was set on.

# Help

Show the current automation settings for the temper-player row.

Default TSV columns: `scope\ttoggle\tvalue`. Scopes:
  - global.characters / global.companions  — per-cohort defaults
  - character:<esoCharId>                  — per-character overrides
  - companion:<companionId>                — per-companion overrides

Only toggles with an explicit boolean value are emitted; undefined
toggles are omitted (they fall through to the default per `resolveToggle`).

`--json` emits the full `AutomationSettings` shape (`global`, `characters`,
`companions`) verbatim — useful for pipeline tools that need the raw
nested structure.
