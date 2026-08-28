---
id: 227a0cf4-fb89-4fba-a611-ea58776dbe8e
slug: a-write-cannot-address-a-page-by-the-slug-it-states
page-type-slug: finding
title: "A write cannot address a page by the slug it states"
domain-slug: domain/pages-system
---

# Claim

A page is addressed `<page-type>/<slug>`, and a page's slug is what its frontmatter states, falling back to its file stem. The write path does not use that rule: it matches a requested name against the file stem alone and never opens the file. A page whose stated slug differs from its stem is therefore unreachable by the write path under the slug it states, and a write addressed that way creates a second page carrying the same address as the first.

Two pages of 58,993 stand in the divergence today, so the fault is real but narrow. It widens with every page that states a slug its filename does not repeat.

# Evidence

Read 2026-08-27.

`tools/lib/page-write-where.ts:29-32` is the whole test: it takes the last path segment and compares it against `${name}.md` or `slugOf(last)`, where `slugOf` is `stemOf` imported under that alias at `:6`. No frontmatter is read.

The read side uses the other rule. `page/index/identity/identity.ts:158` takes `slug` from the frontmatter, and `:123` composes the address as `` `${one.type}${ADDRESS_JOIN}${one.slug ?? one.stem}` `` — stated slug first, stem as fallback. `page/page-types.ts:131` states the same precedence for page types: `slug: stringAt(fm, SLUG) ?? stemOf(relPath)`. `page/page-address.ts:9-22` defines an address as a page type and a slug.

Ran against the real tree: `whereFor(rootsHere(), "life-theme", "946")` answers `pages/life-theme/946.life-theme.md`, a path no file occupies. `pages/life-theme/temper.life-theme.md:6` states `slug: 946`, and `git ls-files` holds no `946.life-theme.md`. So a write addressed to `life-theme/946` creates a second page while the index already answers that address with `temper.life-theme.md`.

Scanned every file whose name carries a page type across the repository, 58,993 of them, and compared the stated `slug:` against the file stem. Exactly two differ: `pages/life-theme/temper.life-theme.md` states `slug: 946`, and `graph/edge-producer/relation/relation.graph-edge-producer.md` states `slug: relation-producer`. No name is both the stem of one file and the stated slug of another, so no ambiguity stands today between the two rules.

Cost of closing it by reading frontmatter: reading the first 4 KB of all 58,993 files took 507 ms, 0.009 ms per file. But `whereFor` scans only one page type's place, and the cost lands per call. The largest is `story-chapter-royal-road` at 17,905 files, where reading every candidate's frontmatter takes 279 ms. Paying that on every write to such a type is not affordable; paying it only when the stem match has already missed confines it to the create path, where a page is about to be written anyway.

`tools/audits/relations-resolve.ts:8` imports `stemOf as slugOf` in the same aliasing as the write path, so at least one read-side audit carries the stem rule too.

Not measured: whether any live caller addresses a page by a slug its filename does not carry, and so whether the second page has ever actually been created rather than merely being reachable.
