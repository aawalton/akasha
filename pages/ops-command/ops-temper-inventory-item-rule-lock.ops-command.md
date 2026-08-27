---
id: 6657e1b6-85ff-5bc3-a39b-b4c37a268278
page-type-slug: ops-command
title: "Ops temper inventory item-rule lock"
slug: ops-temper-inventory-item-rule-lock
domain-parent-slug: domain/ops-temper-inventory-item-rule
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/item-rule/lock.ts
path: temper inventory item-rule lock
---

# Definition

- **Ops temper inventory item-rule lock** — one named-item rule marked so the other commands refuse it.

# Help

Lock a per-item rule by id. Sets `locked: true` so subsequent updates,
deletions, and bulk operations skip the rule unless `--force` is passed.

The pure `lockItemRule` helper does not guard on the existing lock state,
so this command is idempotent — locking an already-locked rule is a no-op
structurally.

Default stdout (JSON — the rule's full shape after the lock).
