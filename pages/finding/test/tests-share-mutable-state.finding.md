---
id: aefd6580-d6e5-501f-bc5a-4a2118eee5b8
slug: tests-share-mutable-state
page-type-slug: finding
title: "Tests share mutable state"
domain-slug: domain/test
---

# Claim

Tests fail because of state another run left behind rather than because of the change under test. A workstation test from one project polluted a cluster `event_subscribers` row and stalled a second project's deploy reconcile; snapshots contained rows from a previous migration, and the regeneration meant to clear that introduced unintended rows of its own.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 6 rows (seq 5085, 5179, 5182, 5199, 5206, 5208) carrying 6 sightings, all at `accumulating`.

The cross-project case is project #11404 polluting the reconcile of a phase-7 deploy. Guild data persisted from a sibling child project against expectation. The regeneration required a manual strip-and-regen cycle. The order of a regenerated snapshot also differed from the order the assertions expected. One row records the recognition that a sibling child project, #11367, had already hit the identical snapshot contamination.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
