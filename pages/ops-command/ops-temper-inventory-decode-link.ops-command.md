---
id: 19e331c6-f958-5d04-9ace-b86c233e34d0
page-type-slug: ops-command
title: "Ops temper inventory decode-link"
slug: ops-temper-inventory-decode-link
domain-parent-slug: domain/ops-temper-inventory
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/inventory/decode-link.ts
path: temper inventory decode-link
---

# Definition

- **Ops temper inventory decode-link** — one ESO item link string taken apart into its fourteen named fields.

# Help

Decode a 20-field ESO item link string to labeled fields.

Default stdout (one field per line, tab-separated):
  <fieldName>\t<value>

--json stdout (stable shape — callers may depend on field names):
  { itemId, subType, level, enchantId, enchantSubType, enchantLevel,
    traitType, flags, style, crafted, bound, stolen, charges, potionData }

Reuses `parseItemLink` from @temper/game-items-core/item-link-parser, so the
decoded shape matches what the addon and web routing see at runtime.
