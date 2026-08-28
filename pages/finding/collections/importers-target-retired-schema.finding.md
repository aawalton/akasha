---
id: 7e7edf89-3a61-5a3e-aabb-611579842b81
slug: importers-target-retired-schema
page-type-slug: finding
title: "Importers target retired schema"
domain-slug: domain/collections
---

# Claim

The external-user content importers and the ki-handler logging skills write against the retired shared page-type schema, which the per-account model superseded on 2026-06-30. `packages/collections/books/src/openlibrary/import-books.ts` hardwires `BOOK_SLUG="book"` and the matching author slug, where Ki now owns `ki-book`, `ki-author`, `ki-show`, `ki-season`, `ki-episode`, `ki-book-series`, `ki-franchise` and `ki-movie`.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 1 row (seq 5302) carrying 1 sighting, all at `accumulating`.

Each ki-prefixed type inherits the Collection Template. Rating changed with the model: it is a number stored on `rating`, the old F–S+ select is gone, and the former `numericRating` was renamed to `rating`. Three skills — log-books, log-anime and ki-handler — document the old targets. The row's own recommendation was a per-account type registry resolving target types and numeric rating from the owner account, which is a proposal rather than part of this claim.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.

This row is not a mined behaviour category. It is one of only two live `issue` rows carrying `attributes.kind = 'feature-request'`, and its `observations` holds a proposal object with `problem`, `options`, `recommendation` and `intentQuestions` rather than an array of sightings — the shape `packages/alanwalton/feature-requests/src/proposal/normalize.ts` builds. The claim is drawn from that row's `problem` and `recommendation` alone: I did not open the code it names, did not check whether the condition still holds, and did not read the options it weighed.
