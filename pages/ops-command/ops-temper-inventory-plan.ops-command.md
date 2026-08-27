---
id: 75b84dcb-1e95-5799-8ca1-a1e5e82bf4cb
page-type-slug: ops-command
title: "Ops temper inventory plan"
slug: ops-temper-inventory-plan
domain-parent-slug: domain/ops-temper-inventory
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/plan.ts
path: temper inventory plan
---

# Definition

- **Ops temper inventory plan** — the in-game inventory plan rebuilt from the workstation files, with the game shut.

# Help

Offline reproduction of /temperplan against the workstation SavedVariables.

Pipeline:
  1. parse SVs   — TemperInventory.lua (bag scan + compiled rules)
                   + TemperCharacters.lua (per-character knowledge)
  2. classify    — leaf-down node ID chain via ITEM_CATEGORY_TREE
  3. match       — computeAllRuleAffectedItems (per-rule affected sets)
  4. cap-filter  — applyDestinationCapacityFilter (drops items that don't fit)
  5. build       — buildManagementPlan (per-character session plan)

Default text mirrors `addon/src/plan.ts` chat output:
  [TemperInventory] Plan:
    <Venue Label> — <verb> <count>, <verb> <count>

Limitations:
  - --from-pages and --snapshot are NOT IMPLEMENTED in this commit; the verb
    throws InputError when either is passed. Use the workstation-file path
    (default) until the pages-DB ingest lands.
