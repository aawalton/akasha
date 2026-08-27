---
id: 5d6ecaf5-8d9c-5acc-96aa-06801c9394e7
page-type-slug: ops-command
title: "Ops temper inventory rule update"
slug: ops-temper-inventory-rule-update
domain-parent-slug: domain/ops-temper-inventory-rule
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/rule/update.ts
path: temper inventory rule update
---

# Definition

- **Ops temper inventory rule update** — named fields replaced on one item-category rule, refused while it is locked.

# Help

Patch fields on an existing category rule.

Routes through `bulkUpdateCategoryRules([id], patch, { force })` so the
lock semantics are uniform with the UI's bulk path. The `assertWriteAllowed`
guard runs first and throws loudly when the rule is locked and `--force`
isn't set — the underlying bulk helper would otherwise no-op silently.

Only flags whose values are present are written; absent flags leave the
current value untouched. Prints the updated rule shape as JSON.
