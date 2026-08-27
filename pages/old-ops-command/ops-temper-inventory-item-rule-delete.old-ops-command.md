---
id: 939d7d6a-96b2-5844-abc9-2b81cfcd6812
page-type-slug: old-ops-command
title: "Ops temper inventory item-rule delete"
slug: ops-temper-inventory-item-rule-delete
domain-parent-slug: domain/ops-temper-inventory-item-rule
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/item-rule/delete.ts
path: temper inventory item-rule delete
irreversible: true
---

# Definition

- **Ops temper inventory item-rule delete** — one named-item rule gone from the list.

# Help

Delete a per-item rule by id. Calls `assertWriteAllowed` first so the
lock error surfaces with the rule id and `--force` hint instead of a
silent no-op (the pure `removeItemRule` filter retains locked rules).

When `--force` is passed, the rule is unlocked first via
`lockItemRule(_, id, false)` so the subsequent `removeItemRule` call
actually removes it.

Default stdout (JSON — the deleted rule's full shape).
