---
id: 01a02000-c71b-7002-820e-969bf1c83627
slug: reference-rows-carry-a-display-label-where-a-slug-is-declared
page-type-slug: finding
title: "Reference rows carry a display label where a slug is declared"
domain-slug: domain/pages-system
---

# Claim

92,125 sidecar rows across 8 reference page types carry a chapter or character display label in a key declared `relation-slug`, which requires kebab. The target usually exists under a correct kebab slug, so the data is wrong and mechanically repairable. But 6 of the 11 affected properties point at `character`, whose glob matches zero files, so no value there can be right.

# Evidence

Measured 2026-08-20 over 352,925 rows in all four page repos.

Worked case: `class-reference.chapter-slug` holds `rw9-38 TV (Pt. 1)`. The chapter it names is `stories:the-wandering-inn/wandering-inn/the-wandering-inn/chapters/0639-9-38-tv-pt-1.md`, which states `slug: 9-38-tv-pt-1`. All 828 wandering-inn chapter slugs are kebab and none has an inner space, so the row carries the source's display label rather than the slug, and the target exists.

Counts: `class-reference.chapter-slug` 76,408, `skill-reference.chapter-slug` 7,765, `spell-reference.chapter-slug` 6,405, `class-reference.claimed-by-slug` 3,468, `skill-reference.claimed-by-slug` 662, `spell-reference.claimed-by-slug` 475, with smaller tails on `reference`, `condition-reference` and `miracle-reference`.

15 relation-slug properties on row types have a zero-population target, and all 15 point at `character`, declared `files: stories:*/characters/*.md` with zero files standing.

Two rows run the other way, and there the rule is what is wrong: `world-mechanic-reading.mechanic-slug` holds `剑圣-心火之刃`, the stated slug of a real page at `stories:the-wandering-inn/spells/剑圣-心火之刃.md`. `properties/page-slug.md` declares a page's own slug `type: text`, while `relationSlugRule` at `tools/lib/page-value.ts:187` requires kebab whatever `slug-property` says. Breadth: 1 of 48,155 stated slugs is non-kebab, so the contradiction is real and almost entirely latent.
