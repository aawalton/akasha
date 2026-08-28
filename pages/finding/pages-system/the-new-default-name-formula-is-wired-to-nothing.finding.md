---
id: 591468c3-5ddd-5f2e-af24-d21f530c5951
page-type-slug: finding
title: "The new default name formula is wired to nothing"
slug: the-new-default-name-formula-is-wired-to-nothing
domain-slug: domain/pages-system
---

# Claim

The `{slug} ?? {id}` default name formula lives in `pages-system/name/` and nothing imports it. The live default is `nameOf` at `page/name/naming/naming.ts:83-95`, which falls through a stated rule, then `slug`, then `pageStem(title)`, then `id`. The successor has no title arm, so every page named by the title step today takes a different name at a cutover.

# Evidence

Measured 2026-08-28 at `08d5363e90`.

The live chain is `nameOf` at `page/name/naming/naming.ts:83-95`: a stated rule at `:84-87` tagged `via: NAMED_FOR`, then `slug` at `:88-89`, then `pageStem(title)` at `:90-91` tagged `via: "title"`, then `id` at `:92-93`, then null.

The successor is unreachable. A search for imports of `pages-system/name` across the repository, excluding `dist`, returns nothing. No page type reaches it and no page is named by it.

The gap between the two is the title step, which the successor does not have.

The earlier reading of this, taken 2026-08-27, put the exposure at nine page types declaring no rule and 233 pages that the new default would rename wrongly, and cited the live default at `naming.ts:85`; the function now runs `:83-95`. Neither number was re-derived here.

Two adjacent facts from the same note are now settled and are not claimed. No property definition carries `type: formula`, so the rule that a property `type` names what it holds has landed in the data. `type: aggregate` and `type: rollup` stand on zero pages, against 4 and 3 when the note was written.

One more has half settled. Two functions named `pageTypeOf` are no longer two in production: the only exported one is `pages-system/page-type/page-type.ts:51`, naming a file page type. The record-building namesake survives as a test-local helper in `pages-system/name/name.unit.test.ts:10` and `pages-system/formula/conformance.unit.test.ts:61`, and in two stale `dist` declarations.

`pages/finding/pages-system/page-name-on-disk-reproducible-by-no-rule.finding.md` is the sibling claim from the other side.

Not measured: which page types would move under the new default.
