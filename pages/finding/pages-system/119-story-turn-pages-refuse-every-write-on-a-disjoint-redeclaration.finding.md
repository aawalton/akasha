---
id: 01a02000-c71b-7003-bfe9-b3c5acac0d80
slug: 119-story-turn-pages-refuse-every-write-on-a-disjoint-redeclaration
page-type-slug: finding
title: "119 story turn pages refuse every write on a disjoint redeclaration"
domain-slug: domain/pages-system
---

# Claim

119 pages under `stories:*/played/*/turns/*.md` refuse every write. `publishedAt` is declared on `collection` as `calendar-date` and on `story-turn` as `instant`, neither stating `narrows-slug:`. Adding `narrows-slug` does not fix it: every declaration in the chain is applied, so the `calendar-date` rule would then refuse all 119 values. The two types are disjoint, not a narrowing.

# Evidence

Measured 2026-08-20 by driving `redeclaration()` and the real rule machinery directly.

As it stands, a `story-turn` page refuses with: "`publishedAt` is declared at `properties/collection-published-at.md` and at `properties/story-turn-published-at.md`, and neither states `narrows-slug:`, so nothing says which of them bounds".

With `narrows-slug: collection` added to `properties/story-turn-published-at.md`, the same page refuses with: "`publishedAt: 2026-07-11T05:17:16.883Z` is not a calendar day, written `YYYY-MM-DD`, which is what `calendar-date` states". One refusal is exchanged for another.

All 119 stated values are ISO instants; 0 are bare calendar dates.

`page-types/story-turn.md` states `extends-slug: collection`. `properties/collection-published-at.md` is `type: calendar-date`; `properties/story-turn-published-at.md` is `type: instant`.

The sibling defect of the same shape — `colour-slug` declared on both `domain` and `readout`, blocking 141 readout pages — was cleared by `narrows-slug: domain` at commit c7193734e4, because there both declarations were `relation-slug` and applying both is harmless. That fix does not transfer.

Which declaration should survive, measured over the whole `collection` tree — 25 page types, 22,275 pages: 18,662 state a bare `YYYY-MM-DD` (`story-chapter-royal-road` 17,107, `story-chapter-wandering-inn` 828, `book` 727), and 119 state an ISO instant, every one of them a `story-turn`. Nothing states anything else.

So `calendar-date` is satisfied by 18,662 pages and is not a rule nothing meets. The two are different claims wearing one name. `Single Authority` admits one declaration rather than two reconciled ones, so clearing this means `story-turn` carrying its own key rather than redeclaring `publishedAt` — a rename across 119 of Alan's story turns, which is his call.
