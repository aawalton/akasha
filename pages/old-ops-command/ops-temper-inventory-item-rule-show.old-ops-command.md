---
id: a8a93113-4f6e-5ff8-aa00-b1d46b14524f
page-type-slug: old-ops-command
title: "Ops temper inventory item-rule show"
slug: ops-temper-inventory-item-rule-show
domain-parent-slug: domain/ops-temper-inventory-item-rule
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/item-rule/show.ts
path: temper inventory item-rule show
---

# Definition

- **Ops temper inventory item-rule show** — one named-item rule's whole shape, found by id.

# Help

Show one item rule by id from the temper-player row's `settings.inventory.itemRules`.

Default stdout (JSON — full rule shape with every set field):
  { id, itemId, itemName, action, active?, locked?, stockQuantity?, destination?, ... }

--tsv stdout (header row + value row, only the canonical columns surface):
  id\titemId\titemName\taction\tactive\tlocked\tstockQuantity\tdestination
