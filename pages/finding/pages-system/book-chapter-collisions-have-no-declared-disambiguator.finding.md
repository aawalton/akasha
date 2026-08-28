---
id: b041fa38-3405-4168-8858-2571b5f1bdd0
slug: book-chapter-collisions-have-no-declared-disambiguator
page-type-slug: finding
title: "Book chapter collisions have no declared disambiguator"
domain-slug: domain/pages-system
---

# Claim

86 `book-chapter` pages collide by file stem. `partOf` separates only 1 of the 42 groups; in the other 41 both pages are part of the same book and differ only by a folder segment no declared property carries. No naming rule over declared keys would make them unique.

# Evidence

Measured 2026-08-28 at commit `48aa105e06` by reading the frontmatter of all 86 colliding pages and by `ops checks audit page-name-unique`, which reported the same 86.

`pages/page-type/book-chapter.page-type.md` states no `named-for`. Walking `extends-slug` — `book-chapter` to `chapter` to `collection` to `page` — reaches no `named-for` either, so `ruleFor` at `page/name/naming/naming.ts:58-72` returns null and `nameOf` at line 88 falls back to `slug`.

The typical pair is `pages/book-chapter/all-about-alan/projects/second-passport/eu/citizenship/belgium.book-chapter.md` and `.../eu/residency/belgium.book-chapter.md`. Both carry `slug: belgium` and both carry `partOf: all-about-alan`. What separates them is the word `citizenship` against `residency`, which stands only in the path.

The keys present across the 86 are `id`, `page-type-slug`, `slug`, `title`, `partOf`, `unit`, `description` (79 of 86) and `position` (2 of 86). None takes a different value across a colliding group except in the single group `partOf` separates.

This differs from the other large populations. For `story-chapter-royal-road` (529 pages) and `story-turn` (84), `partOf` takes a different value on every page of every group; for `idle-persona-card` (123), `player-id` does. Only `book-chapter` has nothing declared to build a rule from.
