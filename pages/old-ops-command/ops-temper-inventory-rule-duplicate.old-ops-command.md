---
id: 53356287-7073-5aa7-94f0-d978a99a2b49
page-type-slug: old-ops-command
title: "Ops temper inventory rule duplicate"
slug: ops-temper-inventory-rule-duplicate
domain-parent-slug: domain/ops-temper-inventory-rule
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/rule/duplicate.ts
path: temper inventory rule duplicate
---

# Definition

- **Ops temper inventory rule duplicate** — a copy of one item-category rule placed just after it, inactive and unlocked.

# Help

Duplicate a category rule, inserting the clone at `sourceIndex + 1`.

Delegates to `duplicateCategoryRule` (pure helper). The clone is
`active: false` and `locked: false` regardless of the source's flags,
so no lock guard is needed (creating a new unlocked rule is always
permitted). Prints the clone's full shape as JSON.
