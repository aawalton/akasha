---
id: d3ddbe7f-4495-5bf4-8c74-1ade003564e3
page-type-slug: old-ops-command
title: "Ops temper inventory buy-rule unlock"
slug: ops-temper-inventory-buy-rule-unlock
domain-parent-slug: domain/ops-temper-inventory-buy-rule
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/buy-rule/unlock.ts
path: temper inventory buy-rule unlock
---

# Definition

- **Ops temper inventory buy-rule unlock** — one buy rule's mark taken off, so the other commands take it again.

# Help

Unlock a buy rule by id. Sets `locked: false` so subsequent updates,
deletions, and bulk operations target the rule normally.

The pure `lockBuyRule` helper does not guard on the existing lock state,
so this command is idempotent — unlocking an already-unlocked rule is a
no-op structurally.

Default stdout (JSON — the rule's full shape after the unlock).
