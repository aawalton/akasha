---
id: ab97f105-2fa2-55ee-badc-7696f65ce624
page-type-slug: ops-command
title: "Ops temper inventory explain"
slug: ops-temper-inventory-explain
domain-parent-slug: domain/ops-temper-inventory
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/explain.ts
path: temper inventory explain
---

# Definition

- **Ops temper inventory explain** — the compiled rule walk over one item, rule by rule, with the action it ends on.

# Help

Walk the compiled rule list against an item and report the final plan.

Pipeline:
  1. decode-link   — parse the bare integer or 20-field item link
  2. parse SVs     — TemperInventory.lua (bag scan + compiled rules)
                     + TemperCharacters.lua (per-character knowledge)
  3. classify      — leaf-down node ID chain via ITEM_CATEGORY_TREE
  4. walk-rules    — the shared evaluator from @temper/game-items-rules-eval
                     consumed by the addon and web matcher (same code path)

Output:
  Identity rows + a per-rule trace + a final outcome row.
  - matched rules carry their resolved destination (e.g., character:<id>)
  - rejected rules carry a kind-of-rejection (category-mismatch, condition-fail,
    container-skip, destination-resolve-fail) and a short detail
  - indeterminate rules carry the missing signal (CLI gaps: live state,
    research/crafting/wanted-equipment maps, cooldown timers)

Limitation: every signal the CLI's SavedVariables do not carry surfaces as
an indeterminate verdict for the rule that depends on it. The trace names
the missing signal so the operator can spot the gap by hand.
