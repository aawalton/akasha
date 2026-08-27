---
id: 6b5afaed-b916-54fd-93af-07c42a224ea0
page-type-slug: old-ops-command
title: "Ops temper inventory knowledge"
slug: ops-temper-inventory-knowledge
domain-parent-slug: domain/ops-temper-inventory
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/inventory/knowledge.ts
path: temper inventory knowledge
---

# Definition

- **Ops temper inventory knowledge** — each character's recipe, motif and script counts, or whether one named item is among them.

# Help

Inspect per-character knowledge (recipes, motifs, scribing scripts) loaded
from TemperCharacters.lua. Mirrors the runtime predicate in
`rules-core-character-finders.ts → knowsItem` so callers can answer
"does this character already know this item?" outside the game.

Modes:
  (no flags)               List every character with knowledge counts.
  --char <id>              Counts for a single character.
  --item-key <kind>:<args> For each character, knows=true|false. Combine with
                           --char to restrict to one character.

Item-key forms:
  recipe:<resultItemId>          e.g. recipe:1234
  motif:<styleId>:<chapterId>    e.g. motif:15:4 (chapter book)
  motif:<styleId>:master         e.g. motif:15:master (master book — full style)
  script:<scriptId>              e.g. script:9999

Default stdout (TSV, one record per line):
  count mode:    <id>\t<name>\t<recipeCount>\t<motifCount>\t<scriptCount>
  knows mode:    <id>\t<name>\t<knows>

--json stdout (stable shape):
  count mode:    [{ id, name, recipeCount, motifCount, scriptCount }, ...]
                 or { id, name, recipeCount, motifCount, scriptCount } when --char is set.
  knows mode:    [{ id, name, knows }, ...]
