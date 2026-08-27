---
id: 01a02000-c71b-7001-b2fc-fc65998a317e
slug: no-row-can-state-the-page-type-slug-that-is-required-of-it
page-type-slug: finding
title: "No row can state the page type slug that is required of it"
domain-slug: domain/pages-system
---

# Claim

`page-type-slug` is `required: true` on `page`, the root of every extends chain, so it reaches all 43 row page types — and 0 of 352,925 rows state it. A row cannot: its page type is set by the reader from the parent property's `target-slug`. The requirement is right for files and reaches rows from a page shape that does not apply to them.

# Evidence

Measured 2026-08-20. Every one of the 43 required-key refusals over the whole row corpus is `<type>.page-type-slug (on page)`; no row owes any other required key. The same judgment over 57,741 markdown pages owes `page-type-slug` on none of them.

Declared at `properties/page-type-slug.md:5,9` (`defined-on-slug: page`, `required: true`); `page-types/page.md:5` states `extends-slug: none`.

Why a row cannot state it: `tools/lib/page-derive.ts:177` does `.map((one) => ({ ...one, kind: target }))`, setting a row's page type from the property document's `target-slug` unconditionally. Nothing reads a `page-type-slug` key off a row. The mechanism the declaration exists for is file-only — `claimant()` at `tools/lib/page-types.ts:139-145` prefers a stated `page-type-slug` over the glob claim, which is what `properties/page-type-slug.md:21` describes: "Where a page sits is incidental: the page type it states is what it is." A row has no glob to override; where it sits is what it is.

What the row reader does inject is a different key: `tools/lib/page-data-rows.ts:97` adds `<parentType>-slug` from the parent's name. `tools/lib/page-write.ts:78` writes `page-type-slug` onto every markdown page; `tools/lib/page-data-write.ts` writes it onto no row.

`page-type-slug` is one of 11 file-shape universals every one of the 43 row types leaves unobserved — body, cover, created-at, href, icon, name, owner, seq, page-type-id, page-type-slug, updated-at — and the only one of the eleven that is required. Overall 564 of 1,138 declared row-type property pairs never carried a value on any row.
