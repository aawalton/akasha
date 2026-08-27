---
id: b7fc1eed-5859-59e3-b480-21a636e39984
page-type-slug: ops-command
title: "Ops temper inventory parity"
slug: ops-temper-inventory-parity
domain-parent-slug: domain/ops-temper-inventory
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/parity.ts
path: temper inventory parity
---

# Definition

- **Ops temper inventory parity** — where the addon's stored rule walk and a fresh walk over the same file disagree about one item.

# Help

Compare the addon's stored explain trace to a fresh web-evaluator run.

Reads `diagnostics.lastExplain` from TemperInventory.lua and runs `walkRules`
(the shared web evaluator) over the same item. Emits three sections:
  INPUTS DIFF  — signal-by-signal addon vs web (itemType, traitType, ...)
  WALK DIFF    — per-rule verdict addon vs web (matched / rejected / skipped)
  ROUTING DIFF — web's resolved route for the matched rule; flags SKEW when
                 the addon's matched destination implies a different route

Exit 0 only when all sections show no divergence; exit 1 otherwise.
