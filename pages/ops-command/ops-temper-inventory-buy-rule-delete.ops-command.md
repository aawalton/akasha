---
id: fa6fb426-16c8-5ead-a84a-c99b74a03fed
page-type-slug: ops-command
title: "Ops temper inventory buy-rule delete"
slug: ops-temper-inventory-buy-rule-delete
domain-parent-slug: domain/ops-temper-inventory-buy-rule
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/buy-rule/delete.ts
path: temper inventory buy-rule delete
irreversible: true
---

# Definition

- **Ops temper inventory buy-rule delete** — one buy rule gone from the list.

# Help

Delete a buy rule by id. Calls `assertWriteAllowed` first so the lock
error surfaces with the rule id and `--force` hint instead of a silent
no-op (the pure `removeBuyRule` filter retains locked rules).

When `--force` is passed, the rule is unlocked first via
`lockBuyRule(_, id, false)` so the subsequent `removeBuyRule` call
actually removes it.

Default stdout (JSON — the deleted rule's full shape).
