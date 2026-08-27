---
id: 729c3644-33e4-5d72-8a14-347c4ae74121
page-type-slug: finding
title: "No live page-type row states its backing, so the row-derived half of the backing decision cannot answer file"
domain-slug: domain/pages-system
---

# Claim

No live `page-type` row states its backing. Zero of the 16 live rows carry a `backing` attribute and zero carry a `files` attribute, so the row-derived half of the browser's backing decision cannot answer `file` for any page type that exists today. The file-backed roster at `/api/page-types` is the only thing that settles the question, and where that roster does not answer, the browser has nothing to fall back on rather than a smaller answer.

# Evidence

Run on 2026-08-20 against the live database and the running page query service, not read.

Counting the live rows directly: `select count(*) ... where page_type_slug='page-type' and deleted_at is null` gives 16. Counting the same rows for the two attributes, `count(*) filter (where attributes ? 'backing')` gives 0 and `count(*) filter (where attributes ? 'files')` gives 0. The same reading counted 18 rows about ninety minutes earlier in the same session, so the population is moving while this is measured.

The two halves disagree in size by more than an order of magnitude. The roster at `/page-types` carries 353 page types. `askComposed` for every page of type `page-type` returns 368 pages, and `ops page-type list` returns the same 368. The gap between 353 and 368 is the types whose pages are held in another type's sidecar and which therefore state no glob.

The read path already resolves a page type that has no row at all. `getPageTypeByPluralSlug` for `people` returns slug `person`, and `person` is not among the 16. `ops page list --type exercise --count` returns 884 for a type with no row. `agent` and `property-definition` resolve through rows alone: neither is on the roster, and `property-definition` has 234 live rows.

Read rather than run: `readPageTypeBacking` in `packages/shared/pages/ui-store/src/collection/file-backing.ts` returns `file` only where a `page-type` row states a non-empty `files:` other than `none`, and returns null otherwise. `backingOf` in `packages/shared/pages/ui-store/src/collection/store.ts` calls it and uses its answer only while the roster is unread. Against the measurement above, that call returns null for all 16 rows.
