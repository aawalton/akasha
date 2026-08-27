---
id: 565e8856-4940-50d8-be41-bfafbfad18c8
page-type-slug: ops-command
title: "Ops temper inventory item-rule update"
slug: ops-temper-inventory-item-rule-update
domain-parent-slug: domain/ops-temper-inventory-item-rule
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/item-rule/update.ts
path: temper inventory item-rule update
---

# Definition

- **Ops temper inventory item-rule update** — named fields replaced on one named-item rule, refused while it is locked.

# Help

Update fields on a per-item rule by id. Routes through `bulkUpdateItemRules`
with a single-id list so the locked-rule guard, `updatedAt` bump, and
field-level merge are all handled by the pure helper. The CLI calls
`assertWriteAllowed` first so the lock error surfaces with the rule id
and `--force` hint instead of a silent no-op.

Default stdout (JSON — full rule shape after the patch).
