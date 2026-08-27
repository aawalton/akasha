---
id: cc3a927f-5fc2-5729-9fa0-69bee5a29c72
page-type-slug: finding
title: "Package move oom"
domain-slug: domain/ops-cli
---

# Claim

`bun ops package move` exits 144 on out-of-memory and takes the CLI shell down with it mid-relocation, leaving the move partly applied. Four sightings are recorded, one of them on the `temper-task-reactor` move.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 1 row (seq 5147) carrying 4 sightings, all at `accumulating`.

This is the only row in the register naming a resource ceiling on an `ops` command rather than an argument or path mistake, and the only one where the failure lands mid-write rather than before the work starts.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
