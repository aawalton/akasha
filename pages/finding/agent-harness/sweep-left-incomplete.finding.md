---
id: 5a16f79a-8f50-5c6d-822c-821905372e6d
page-type-slug: finding
title: "Sweep left incomplete"
domain-slug: repo/code-repo
---

# Claim

A sweep across call sites is reported complete while sites remain, and the gap surfaces from a later instrument rather than from the sweep. An audit found two reconcile-path `runGit` sites without `runOpts` after the implementation was thought finished; one snapshot was updated and its correlated snapshot with the same stale data was missed.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 3 rows (seq 5113, 5114, 5142) carrying 4 sightings, all at `accumulating`.

The `ops package move` codemod rewrote the files it moved but left `../../` relative preload paths in the moved `bunfig.toml` files, which now sit one level deeper. In each case the first run was coherent and finished-looking, which is why nothing in the run itself reported the remainder.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
