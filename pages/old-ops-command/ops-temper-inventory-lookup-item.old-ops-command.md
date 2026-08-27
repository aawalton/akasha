---
id: 868cb34f-b751-57c8-98a8-cda13d003056
page-type-slug: old-ops-command
title: "Ops temper inventory lookup-item"
slug: ops-temper-inventory-lookup-item
domain-parent-slug: domain/ops-temper-inventory
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/lookup-item.ts
path: temper inventory lookup-item
---

# Definition

- **Ops temper inventory lookup-item** — one item id or link found in the bag scan and named recipe, script, motif or unknown.

# Help

Resolve an itemId or item link against the local TemperInventory.lua scan,
then classify it against the static recipe / script / motif catalogs.

The positional may be either a bare integer item id (e.g. 16424) or a full
ESO item link (e.g. |H1:item:16424:...|h|h). Links are decoded with the
same `parseItemLink` the addon and web routing use.

Default stdout (one field per line, tab-separated):
  itemId\t<id>
  itemLink\t<link or empty>
  itemName\t<name or empty>
  classification\trecipe|script|motif|unknown
  categoryNodeIds\t<json array>           # leaf-down chain from ITEM_CATEGORY_TREE; "[]" when not found
  recipeResultItemId\t<n>      # only for recipe
  scriptId\t<n>                # only for script
  motifCollection\t<n>         # only for motif
  motifBook\t<n>               # only for motif

--json stdout (stable shape — callers may depend on field names):
  { itemId, itemLink, itemName, classification, categoryNodeIds,
    recipeResultItemId?, scriptId?, motifCollection?, motifBook? }
