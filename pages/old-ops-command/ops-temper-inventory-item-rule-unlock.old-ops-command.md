---
id: f9e03923-25c5-5b51-a67a-0103f04059dd
page-type-slug: old-ops-command
title: "Ops temper inventory item-rule unlock"
slug: ops-temper-inventory-item-rule-unlock
domain-parent-slug: domain/ops-temper-inventory-item-rule
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/item-rule/unlock.ts
path: temper inventory item-rule unlock
---

# Definition

- **Ops temper inventory item-rule unlock** — one named-item rule's mark taken off, so the other commands take it again.

# Help

Unlock a per-item rule by id. Sets `locked: false` so subsequent updates,
deletions, and bulk operations target the rule normally.

The pure `lockItemRule` helper does not guard on the existing lock state,
so this command is idempotent — unlocking an already-unlocked rule is a
no-op structurally.

Default stdout (JSON — the rule's full shape after the unlock).
