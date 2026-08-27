---
id: f5ee98d6-5866-555d-9791-5c1f77af9b4a
slug: word-count-def-get-or-create-can-miss-and-wedge
page-type-slug: finding
title: "Word count def get or create can miss and wedge"
domain-slug: page-type/page-property-definition
---

# Claim

The `authored-book` page type's word-count property-definition get-or-create can silently miss a live row and then wedge itself so every future run fails, though the one instance this produced (pipeline 26923) was cleared by manually soft-deleting the duplicate rather than by any code change.

# Evidence

Project #17432, domain `page-property-definition`. Found while verifying #17353 on main. Main pipeline 26923 at `65cf5456` ran 30 workflows; `books-word-count` failed in 0s with `getPage: expected at most one row, got 2`. Not caused by #17353 (touches `packages/books/**` markdown and `coverage-status.ts`, not `recompute-word-count.ts`/`seed.ts`/`ensure-page-types.ts`); condition predated landing by two days.

Two live `property-definition` rows carried the same `(pageType, stringId)` pair for `authored-book`: `019ee50f-9adb-7519-91c4-8a3f1b504c47` (seq 2260, created 2026-06-20T12:44:25.681Z) and `019fb2d8-00cd-7898-a296-c131f02691ae` (seq 3356, created 2026-07-30T11:45:28.261Z), both "Word Count", type `number`, user `ffffffff-…`. The second was a verbatim duplicate — the only duplicate `(pageType, stringId)` group in the store; the four `authored-book` rows were otherwise clean.

Two defects: (A) a read missed a row that was there — the get-or-create's lookup is only correct if it cannot miss, and it did; no `public.events` row names either id, so provenance is unrecoverable. (B) it wedges itself once it has missed once — the lookup is at-most-one, so the duplicate made every later `ensurePageTypes` call over that page type throw, at the top of `recomputeBookWordCounts`, total failure.

[2026-08-01T15:32:29.977Z] With Alan's approval, `019fb2d8-…` was soft-deleted (`ops property-definition delete`, deletedAt 2026-08-01T15:29:52Z; reversible via `ops property-definition undelete`). `019ee50f-…` remains live; zero duplicate groups remain store-wide. `ops pipeline retry --seq 26923 --workflow books-word-count` completed the step, taking pipeline 26923 to completed 30/30 at `65cf5456`, confirming the duplicate row was the whole failure. Not fixed: `ensurePageTypes` still does not refuse creating a second row for an existing `(pageType, stringId)` pair, loudly, naming the pair and ids.
