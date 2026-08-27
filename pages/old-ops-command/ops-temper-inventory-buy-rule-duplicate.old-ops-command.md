---
id: 70bd73da-0757-5436-85c9-6b07ead29efa
page-type-slug: old-ops-command
title: "Ops temper inventory buy-rule duplicate"
slug: ops-temper-inventory-buy-rule-duplicate
domain-parent-slug: domain/ops-temper-inventory-buy-rule
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/buy-rule/duplicate.ts
path: temper inventory buy-rule duplicate
---

# Definition

- **Ops temper inventory buy-rule duplicate** — a copy of one buy rule placed just after it, inactive and unlocked.

# Help

Duplicate a buy rule by id. The clone is inserted immediately after the
source, gets a fresh id, and is forced to `locked: false, active: false`
regardless of the source's state.

No lock guard — duplicating a locked rule is always permitted; only the
source's id is read, never mutated.

Default stdout (JSON — the freshly-cloned rule's full shape).
