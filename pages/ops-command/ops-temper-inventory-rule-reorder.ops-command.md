---
id: b09a8bd4-0b3c-5034-a3e6-d9a7bd17b0a7
page-type-slug: ops-command
title: "Ops temper inventory rule reorder"
slug: ops-temper-inventory-rule-reorder
domain-parent-slug: domain/ops-temper-inventory-rule
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/rule/reorder.ts
path: temper inventory rule reorder
---

# Definition

- **Ops temper inventory rule reorder** — one item-category rule moved to an index, or to just before or after another.

# Help

Move a user category rule. Exactly one destination mode is required:
`--to <index>` (absolute) or `--before <id>` / `--after <id>` (anchor-relative).

Controlled rules are derived at export time and not part of `settings.rules`,
so this command only operates on user rules. `assertWriteAllowed` guards the
call when the rule is locked — pass `--force` to bypass.

`--to` must be a non-negative integer ≤ user-rules length (insert-after-end
permitted, matching `Array#splice` semantics) — it is the `pos` column from
`rule list`, NOT the displayed row offset (which includes prepended
controlled rules).

`--before`/`--after` take another user rule's id as the anchor, so the
caller never computes an index. The anchor must be a user rule (a
controlled-rule or unknown id is rejected) and may not equal the moved id.
