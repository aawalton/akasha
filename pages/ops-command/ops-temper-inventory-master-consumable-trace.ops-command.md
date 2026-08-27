---
id: ca54d025-2885-5537-96b0-278c9a122cb7
page-type-slug: ops-command
title: "Ops temper inventory master-consumable-trace"
slug: ops-temper-inventory-master-consumable-trace
domain-parent-slug: domain/ops-temper-inventory
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/master-consumable-trace.ts
path: temper inventory master-consumable-trace
---

# Definition

- **Ops temper inventory master-consumable-trace** — the addon's ring of alchemy, enchanting and provisioning writ decisions, each with its outcome.

# Help

Print the addon's rolling ring of CONSUMABLE master-writ traces (alchemy /
enchanting / provisioning) from TemperInventory.lua SavedVariables — one
entry per resolve and execute decision, with the spec identity, school-
specific facts (solvent/reagents, recipe, runes), and the outcome (which
branch each craft took, including the silent resolve-time bails).

Reads from:
  TemperInventory_SavedVariables
    → Default → @<account> → $AccountWide → diagnostics → masterConsumableTraces

SavedVariables flush to disk only on /reloadui or /quit, so the workflow is:
accept the writ, open the crafting station, /reloadui, then run this command.
