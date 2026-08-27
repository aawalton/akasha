---
id: bbfe4853-0879-5acf-bfe6-ce19ff3b161c
page-type-slug: old-ops-command
title: "Ops temper inventory buy-rule list"
slug: ops-temper-inventory-buy-rule-list
domain-parent-slug: domain/ops-temper-inventory-buy-rule
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/buy-rule/list.ts
path: temper inventory buy-rule list
---

# Definition

- **Ops temper inventory buy-rule list** — every buy rule beside the total the item stands at now and the shortfall left.

# Help

List every buy rule the temper-player page holds under
`settings.inventory.buyRules`, each beside what the latest inventory snapshot
says: the target quantity, the current global total (summed across ALL storage
locations), and the shortfall (max(0, target − current)).

All rules are listed (active and inactive); current/shortfall are computed for
every rule. When no snapshot has been scanned yet, current/shortfall render as
"no-snapshot" (TSV) / null (--json) and only the stored target is meaningful.

Default stdout (TSV — one rule per line, header row first):
  itemName\titemId\ttarget\tcurrent\tshortfall\tsource\tactive\tlocked\tid

--json stdout (stable shape — array of rules + computed totals):
  [{ ...BuyRule, currentTotal: number | null, shortfall: number | null }, ...]
