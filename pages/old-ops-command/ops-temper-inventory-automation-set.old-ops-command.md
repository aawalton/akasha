---
id: acfd8913-b0e4-528a-86df-a94cbc746059
page-type-slug: old-ops-command
title: "Ops temper inventory automation set"
slug: ops-temper-inventory-automation-set
domain-parent-slug: domain/ops-temper-inventory-automation
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/automation/set.ts
path: temper inventory automation set
---

# Definition

- **Ops temper inventory automation set** — one automation toggle set or cleared on one scope.

# Help

Set or clear a single automation toggle on the temper-player row.

Scope grammar:
  - global                    — global default (requires `--target` for
                                overlapping toggle names: equipment, skills)
  - character:<esoCharId>    — per-character override
  - companion:<companionId>  — per-companion override

Value semantics:
  - true / false  — set the toggle to that boolean
  - null          — delete the entry. Per-entity overrides fall through
                    to the matching global default; a cleared global
                    default surfaces as the `resolveToggle` `?? false`
                    fallback.

Sibling settings slices (`inventory`, `backpack`, `craft-bag-access`,
`managed-guild-banks`, …) are untouched — the write is a single RFC 6902
`replace` op on `/settings/automation`.
