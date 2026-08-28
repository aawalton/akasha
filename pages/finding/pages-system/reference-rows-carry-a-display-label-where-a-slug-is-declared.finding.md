---
id: 01a02000-c71b-7002-820e-969bf1c83627
slug: reference-rows-carry-a-display-label-where-a-slug-is-declared
page-type-slug: finding
title: "Reference rows carry a display label where a slug is declared"
domain-slug: domain/pages-system
---

# Claim

92,136 sidecar rows across 6 reference page types carry a chapter or character display label in a key declared `relation-slug`, which requires kebab. The target usually stands, so the data is wrong and 99.8% of it is mechanically repairable. 15 of those properties point at `character`, whose glob matches zero files, so no value there can be right. One row runs the other way, and there the rule is what is wrong. Nothing refuses any of it today.

# Evidence

Re-measured 2026-08-28 over 4,522,201 rows in 11,564 sidecars. 95,339 key instances on 92,136 rows hold a non-kebab value in a `relation-slug` key: `class-reference.chapter-slug` 76,408, `skill-reference.chapter-slug` 7,765, `spell-reference.chapter-slug` 6,405, `class-reference.claimed-by-slug` 3,468, `skill-reference.claimed-by-slug` 662, `spell-reference.claimed-by-slug` 475, tails on `reference`, `condition-reference`, `miracle-reference`. The 2026-08-20 reading said 8 reference page types; there are 6. Its 92,125 omits 11 `collection.partOf` rows, comma-joined lists and a different fault.

Worked case: `pages/class/the-wandering-inn/abacus-counter.class.references.jsonl` holds `"chapter-slug":"rw9-38 TV (Pt. 1)"`. That chapter stands under `pages/story-chapter-wandering-inn/` stating `slug: 0639-9-38-tv-pt-1`, not the `9-38-tv-pt-1` read on 2026-08-20: chapter slugs now carry a four-digit sequence prefix. Strip `rw`, lowercase, replace non-alphanumeric runs with `-`, match against chapter slugs with their prefix stripped: of 400 sampled values, 399 resolve to exactly one chapter.

`character.page-type.md:6` declares `files: akasha:**/*.character.md`, not the `stories:` glob read before. It matches 0 files and nothing extends it. 86 relation-slug properties stand on row page types and 15 target `character`, all from `reference-claimed-by`, `reference-holder` and `character-reading-character`.

The other way: `world-mechanic-reading.mechanic-slug` holds `剑圣-心火之刃`, the stated slug of a real `spell` page under `pages/spell/the-wandering-inn/`. `relationSlugRule` at `page/property/value.ts:170-176` lets `slug-property` change its message and never its test. `page-slug.page-property-definition.md:20` says a slug carries whatever characters its name carries, so the rule contradicts a declared invariant. 29 of 58,960 stated slugs are non-kebab, not 1 of 48,155.

None of it is refused: `judgeRow` at `page/property/judge.ts:184-207` evaluates no value rule.