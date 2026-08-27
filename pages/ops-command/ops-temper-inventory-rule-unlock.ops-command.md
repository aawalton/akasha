---
id: 2aacef0b-37e0-5180-9675-f1e79d5408c8
page-type-slug: ops-command
title: "Ops temper inventory rule unlock"
slug: ops-temper-inventory-rule-unlock
domain-parent-slug: domain/ops-temper-inventory-rule
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/rule/unlock.ts
path: temper inventory rule unlock
---

# Definition

- **Ops temper inventory rule unlock** — one item-category rule's mark taken off, so the other commands take it again.

# Help

Set `locked: false` on a category rule via `lockCategoryRule(_, id, false)`.

No write guard — unlocking a locked rule is the only way to recover an
agent-locked entry without `--force`.
