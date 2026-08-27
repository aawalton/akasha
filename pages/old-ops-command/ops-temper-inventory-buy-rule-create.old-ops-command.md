---
id: 58b0f91d-cc80-5447-8214-3ae95f72d548
page-type-slug: old-ops-command
title: "Ops temper inventory buy-rule create"
slug: ops-temper-inventory-buy-rule-create
domain-parent-slug: domain/ops-temper-inventory-buy-rule
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/buy-rule/create.ts
path: temper inventory buy-rule create
---

# Definition

- **Ops temper inventory buy-rule create** — one more rule on a named item and a total to hold it at, inactive.

# Help

Create a new buy rule on the temper-player row's `settings.inventory.buyRules`.

A buy rule is a target-state acquisition rule (the documented exception to
the partition model — *not* an ItemAction): maintain item X up to a GLOBAL
target quantity (summed across all storage locations) and buy the shortfall
at a source. First source: `merchant`.

The required core (--item-id, --item-name, --target) is passed through
`addBuyRule`, which assigns a fresh uuid, prepends the rule, and forces
`active: false`. Optional metadata fields are then applied via
`bulkUpdateBuyRules` on the new id.

New rules are created INACTIVE — pass `--active true` (or run `buy-rule
update <id> --active true` later) to activate.

Default stdout (JSON — full rule shape):
  { id, itemId, itemName, targetQuantity, source, active, ... }
