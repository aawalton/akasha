---
id: 8e2b725b-11a0-5784-9566-eeb0311656d2
page-type-slug: ops-command
title: "Ops temper inventory rule create"
slug: ops-temper-inventory-rule-create
domain-parent-slug: domain/ops-temper-inventory-rule
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/rule/create.ts
path: temper inventory rule create
---

# Definition

- **Ops temper inventory rule create** — one more rule on an item category, at the end of the list and inactive.

# Help

Append a new category rule to `attributes.settings.inventory.rules`.

Delegates to `addCategoryRule` (pure helper). Defaults: `active: false`,
no conditions. Prints the created rule (id + full shape) as JSON.
