---
id: 01a02000-c71b-7002-820e-969bf1c83627
slug: reference-rows-carry-a-display-label-where-a-slug-is-declared
page-type-slug: finding
title: "Reference rows carry a display label where a slug is declared"
domain-slug: domain/pages-system
---

# Claim

92,125 sidecar rows across 8 row page types carry a non-kebab value in a key declared `relation-slug`. 95,337 of the 95,339 are chapter or character display labels, not slugs in any encoding, so no widening of the rule rescues one of them; the other 2 are real CJK slugs, and there the rule is what is wrong. 15 of these properties point at `character`, whose glob matches zero files, so no value there can be right. Nothing refuses any of it: `judgeRow` evaluates no value rule.

# Evidence

Re-measured 2026-08-28, a third reading agreeing with two. 95,339 non-kebab key instances on 92,125 rows, as `chapter-slug` plus `claimed-by-slug`: `class-reference` 76,408 and 3,468, `skill-reference` 7,765 and 662, `spell-reference` 6,405 and 475, `reference` 82 and 8, `condition-reference` 34 and 1, `miracle-reference` 23 and 6; plus `character-reading.character-slug` 1 and `world-mechanic-reading.mechanic-slug` 1. Corpus totals drift as agents write, so none is stated here as fixed.

The split: 88,920 ASCII display labels, 4,052 capitalised names under `claimed-by-slug`, 2,365 labels carrying typographic punctuation (2,350 of them an en dash), and 2 CJK slugs. No CJK ideograph stands in the other 95,337: data repair for those, a rule question for 2. Targets stand: `rw9-38 TV (Pt. 1)` names the chapter slugged `0639-9-38-tv-pt-1`.

The 2: `world-mechanic-reading.mechanic-slug` holds `剑圣-心火之刃`, the stated slug of a real spell page; `character-reading.character-slug` holds `伶央`. Two declarations contradict. `page-slug.page-property-definition.md:20` says a slug carries whatever characters its name carries; `slug.page-property-type.md:13` defines the slug type as lower-case words joined by hyphens. A page may hold a slug nothing may point at. The rule is `page/document/value.ts:6` through `checkScalar`; `type-cache.ts:59` is an identical literal sanitising a cache directory name at line 196, enforcing nothing about pages.

Corrections: 8 row page types, not 6, six `*-reference` and two reading types. The 11 `collection.partOf` rows are neither faults nor in the population, `collection-part-of.page-property-definition.md:7` declaring the union `relation-slug | list(relation-slug)`, all 11 being JSON arrays of kebab values. Control: the same scan read 6,096 `partOf` values for 0 faults and 107,457 `class-reference.chapter-slug` values for 76,408. Count strictly: 84 properties typed exactly `relation-slug`, 2 more `relation-slug | none`. `character.page-type.md:6` confirmed at 0 files. The 99.8% repairable figure was not re-checked.
