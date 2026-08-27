---
id: 8c8966f5-1b9d-58c7-9df8-daeb492587ff
page-type-slug: old-ops-command
title: "Ops temper inventory buy-rule lock"
slug: ops-temper-inventory-buy-rule-lock
domain-parent-slug: domain/ops-temper-inventory-buy-rule
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/buy-rule/lock.ts
path: temper inventory buy-rule lock
---

# Definition

- **Ops temper inventory buy-rule lock** — one buy rule marked so the other commands refuse it.

# Help

Lock a buy rule by id. Sets `locked: true` so subsequent updates,
deletions, and bulk operations skip the rule unless `--force` is passed.

The pure `lockBuyRule` helper does not guard on the existing lock state,
so this command is idempotent — locking an already-locked rule is a no-op
structurally.

Default stdout (JSON — the rule's full shape after the lock).
