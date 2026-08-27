---
id: 71d80508-5faa-5ed4-bd35-0e762c53dee8
page-type-slug: ops-command
title: "Ops temper inventory rule lock"
slug: ops-temper-inventory-rule-lock
domain-parent-slug: domain/ops-temper-inventory-rule
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/rule/lock.ts
path: temper inventory rule lock
---

# Definition

- **Ops temper inventory rule lock** — one item-category rule marked so the other commands refuse it.

# Help

Set `locked: true` on a category rule via `lockCategoryRule(_, id, true)`.

No write guard — `lockCategoryRule` toggles the lock bit unconditionally
(the guard is structural protection for *other* writes, not for the lock
operation itself).
