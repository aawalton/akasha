---
id: 89b13bd2-a347-5239-bc77-6aedc330c65f
page-type-slug: old-ops-command
title: "Ops temper inventory rule delete"
slug: ops-temper-inventory-rule-delete
domain-parent-slug: domain/ops-temper-inventory-rule
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/rule/delete.ts
path: temper inventory rule delete
irreversible: true
---

# Definition

- **Ops temper inventory rule delete** — one item-category rule gone from the list.

# Help

Remove a category rule by id.

`assertWriteAllowed` guards the call when the rule is locked — pass
`--force` to bypass. `removeCategoryRule` itself silently keeps locked
rules (`filter(r.id !== id || r.locked)`), so `--force` first calls
`lockCategoryRule(_, id, false)` to drop the lock, then `removeCategoryRule`
to evict the row.
