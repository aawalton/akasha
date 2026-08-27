---
id: 01a02000-c71b-7000-b6b1-2e4aebc8ef36
slug: a-row-and-a-file-spell-an-absent-value-differently
page-type-slug: finding
title: "A row and a file spell an absent value differently"
domain-slug: domain/pages-system
---

# Claim

155,933 of 352,925 sidecar rows hold an empty string in a key declared `text`, which `text` refuses. The same declarations refuse no such value on any of 57,741 markdown pages: a file writer omits an absent key where a row writer writes an empty string. Neither the data nor the declaration is wrong on its own — the two halves of the corpus spell absence differently and nothing adjudicates between them.

# Evidence

Measured 2026-08-20 by replaying the real rule machinery of `judgeFrontmatter` over every sidecar row in all four page repos. Population 352,925 rows, 11,298 sidecars, 43 row page types, none unresolved.

728,070 key instances hold an empty string; 727,527 of them are on `temper-mined-item` (`abilityHeader` 155,432, `abilityDescription` 154,141, `flavorText` 127,572, `enchantDescription` 108,581). Every one is declared `type: text`, which refuses an empty string at `tools/lib/page-value.ts:196-198`.

The control: the identical judgment over the 57,741 markdown pages the same page types claim gives 0 empty-value refusals, and 2 type refusals in total across the whole markdown corpus.

`blank: true` exists for exactly this case — `properties/page-property-definition-blank.md`, "whether a key may stand with nothing written after it" — and exactly 2 property documents in the whole corpus use it. If an empty string is a legitimate value, `blank: true` on the affected property documents clears 155,933 rows at zero data cost. If absence should be spelled by omission, 155,933 rows and the writer that appends them both change.

The instrument agreed with the real `judgeFrontmatter` on 57,856 of 57,856 markdown pages, refusal strings byte-identical, with four negative controls firing.
