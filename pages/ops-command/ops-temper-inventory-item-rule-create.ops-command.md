---
id: 54959fe6-89ed-54b8-a9d3-0c8c5a52d2ee
page-type-slug: ops-command
title: "Ops temper inventory item-rule create"
slug: ops-temper-inventory-item-rule-create
domain-parent-slug: domain/ops-temper-inventory-item-rule
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/item-rule/create.ts
path: temper inventory item-rule create
---

# Definition

- **Ops temper inventory item-rule create** — one more rule on a named item, active unless the run says otherwise.

# Help

Create a new per-item rule on the temper-player row's `settings.inventory.itemRules`.

The required core (--item-id, --item-name) is passed through `addItemRule`,
which assigns a fresh uuid and prepends the rule. Optional fields are then
applied via `bulkUpdateItemRules` on the new id, since the single-rule
`addItemRule` helper signature only accepts the action triple.

Default stdout (JSON — full rule shape):
  { id, itemId, itemName, action, active?, ..., destination?, stockQuantity? }
