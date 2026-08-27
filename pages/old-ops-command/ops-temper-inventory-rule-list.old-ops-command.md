---
id: 3e0af2c2-a2fa-5b43-8939-6f58387a5bac
page-type-slug: old-ops-command
title: "Ops temper inventory rule list"
slug: ops-temper-inventory-rule-list
domain-parent-slug: domain/ops-temper-inventory-rule
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/rule/list.ts
path: temper inventory rule list
---

# Definition

- **Ops temper inventory rule list** — every rule on an item category, in priority order, the derived ones first and unnumbered.

# Help

Print the priority-ordered category rule list as the in-game addon sees it.

Derived controlled rules (built from `automation` toggles via
`buildAllControlledRules`) are prepended to the user rules — mirroring
`temper/scripts/src/watcher/export-settings.ts`, which is what
the addon ultimately reads.

Default stdout: TSV with columns `pos\tid\tcategoryId\taction\tactive\tlocked\tdestination\tcontrolled`.
`pos` is the 0-based `settings.rules` index (the value `rule reorder --to`
expects) — blank for controlled rows, sequential for user rows.
--json stdout: full rule array (controlled rules prepended), each carrying
the same `pos` field (omitted on controlled rows).
