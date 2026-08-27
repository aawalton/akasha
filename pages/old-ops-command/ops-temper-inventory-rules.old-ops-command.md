---
id: 8d534d20-95f9-55ec-9d53-e7dccfb1131a
page-type-slug: old-ops-command
title: "Ops temper inventory rules"
slug: ops-temper-inventory-rules
domain-parent-slug: domain/ops-temper-inventory
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/rules.ts
path: temper inventory rules
---

# Definition

- **Ops temper inventory rules** — the compiled rules, wanted consumables and character priority the addon last wrote to its file.

# Help

Inspect the compiled rule config written to TemperInventory.lua.

The compiled config lives at:
  TemperInventory_SavedVariables
    → ['Default'] → ['@<account>'] → ['$AccountWide'] → ['sellCompiled']

Sections:
  rules       — one line per compiled rule (TSV columns:
                  index, id, action, destination, categoryId, conditionCount)
  consumables — one line per wantedConsumables entry (TSV: itemId, summary)
  priority    — characterPriority IDs in sort order, one per line
  all         — structured summary of all three sections (default)

--json emits a stable shape:
  { rules: [{ id, action, destination, categoryId, conditionCount }, ...],
    wantedConsumables: { '<itemId>': { ... }, ... },
    characterPriority: ['<id>', ...] }
