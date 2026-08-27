---
id: 2d82dcbc-8675-5e72-b886-73592b5d0ea4
page-type-slug: old-ops-command
title: "Ops temper inventory buy-rule update"
slug: ops-temper-inventory-buy-rule-update
domain-parent-slug: domain/ops-temper-inventory-buy-rule
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/buy-rule/update.ts
path: temper inventory buy-rule update
---

# Definition

- **Ops temper inventory buy-rule update** — named fields replaced on one buy rule, refused while it is locked.

# Help

Update fields on a buy rule by id. Routes through `bulkUpdateBuyRules`
with a single-id list so the locked-rule guard, `updatedAt` bump, and
field-level merge are all handled by the pure helper. The CLI calls
`assertWriteAllowed` first so the lock error surfaces with the rule id
and `--force` hint instead of a silent no-op.

`--item-id` / `--item-name` are not updatable — delete and recreate to
change the item a rule targets.

Default stdout (JSON — full rule shape after the patch).
