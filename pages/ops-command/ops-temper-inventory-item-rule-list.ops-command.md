---
id: 17e1433b-93c4-5992-aa52-d10a83eef42f
page-type-slug: ops-command
title: "Ops temper inventory item-rule list"
slug: ops-temper-inventory-item-rule-list
domain-parent-slug: domain/ops-temper-inventory-item-rule
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/item-rule/list.ts
path: temper inventory item-rule list
---

# Definition

- **Ops temper inventory item-rule list** — every rule on a named item, in the order they are stored.

# Help

List every per-item rule on the temper-player row's `settings.inventory.itemRules`.

Default stdout (TSV — one rule per line, header row first):
  id\titemId\titemName\taction\tactive\tlocked\tstockQuantity\tdestination

--json stdout (stable shape — array of rules):
  [{ id, itemId, itemName, action, active?, locked?, stockQuantity?, destination?, ... }, ...]
