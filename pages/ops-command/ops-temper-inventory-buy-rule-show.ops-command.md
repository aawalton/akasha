---
id: 9ceec0cd-9204-560c-aad8-c65fccf09762
page-type-slug: ops-command
title: "Ops temper inventory buy-rule show"
slug: ops-temper-inventory-buy-rule-show
domain-parent-slug: domain/ops-temper-inventory-buy-rule
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/buy-rule/show.ts
path: temper inventory buy-rule show
---

# Definition

- **Ops temper inventory buy-rule show** — one buy rule's whole shape, found by id.

# Help

Show one buy rule by id from the temper-player row's `settings.inventory.buyRules`.

Default stdout (JSON — full rule shape with every set field):
  { id, itemId, itemName, targetQuantity, source, active?, locked?, ... }

--tsv stdout (header row + value row, only the canonical columns surface):
  id\titemId\titemName\ttargetQuantity\tsource\tactive\tlocked
