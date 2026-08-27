---
id: 9d17bc95-9253-5980-829f-8beac00f724d
page-type-slug: old-ops-command
title: "Ops temper inventory capacity-audit"
slug: ops-temper-inventory-capacity-audit
domain-parent-slug: domain/ops-temper-inventory
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/capacity-audit.ts
path: temper inventory capacity-audit
---

# Definition

- **Ops temper inventory capacity-audit** — the items the capacity filter dropped, per destination, with slots needed against slots free.

# Help

Report destinations that overflow their storage capacity.

Runs the same engine as `plan` (parse SVs → classify → match → capacity
filter), then reports what the capacity filter DROPPED — the items `plan`
silently omits because a destination is out of room. Per destination:
slots needed vs free, and which rules/items were dropped.

Quiet-on-clean: prints a single 'no capacity overflow' line when every
destination fits. `--json` emits the raw CapacityAudit shape.
