---
id: db7fc609-4b75-5089-bf44-6911f063240e
page-type-slug: old-ops-command
title: "Ops temper inventory item-rule duplicate"
slug: ops-temper-inventory-item-rule-duplicate
domain-parent-slug: domain/ops-temper-inventory-item-rule
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/item-rule/duplicate.ts
path: temper inventory item-rule duplicate
---

# Definition

- **Ops temper inventory item-rule duplicate** — a copy of one named-item rule placed just after it, inactive and unlocked.

# Help

Duplicate a per-item rule by id. The clone is inserted immediately after
the source, gets a fresh uuid, and is forced to `locked: false, active:
false` regardless of the source's state.

No lock guard — duplicating a locked rule is always permitted; only the
source's id is read, never mutated.

Default stdout (JSON — the freshly-cloned rule's full shape).
