---
id: 5fc34543-58f7-5acc-99c5-9ad5e1167c25
page-type-slug: ops-command
title: "Ops temper inventory master-craft-trace"
slug: ops-temper-inventory-master-craft-trace
domain-parent-slug: domain/ops-temper-inventory
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/master-craft-trace.ts
path: temper inventory master-craft-trace
---

# Definition

- **Ops temper inventory master-craft-trace** — the addon's ring of equipment writ craft attempts, each with its station, pattern and outcome.

# Help

Print the addon's rolling ring of equipment master-writ CRAFT traces from
TemperInventory.lua SavedVariables — one entry per craft execute(), with the
station context, resolved pattern, verify-before-craft observations, and the
outcome (which branch the craft took, including silent pre-guard bails).

Reads from:
  TemperInventory_SavedVariables
    → Default → @<account> → $AccountWide → diagnostics → masterCraftTraces

SavedVariables flush to disk only on /reloadui or /quit, so the workflow is:
interact with the crafting station, /reloadui, then run this command.
