---
id: aa481a60-cd77-5a89-923d-e2d8225335bc
slug: loop-continued-while-blocked
page-type-slug: finding
title: "Loop continued while blocked"
domain-slug: domain/agent-harness
---

# Claim

An autonomous loop keeps ticking while the thing it waits on is already known to be blocked. Alan interrupted one tick where the agent went on polling with CI known-blocked, and separately cancelled every running agent to make room for CI fixes because the orchestrator could not tell its workers were stalled behind a CI control-plane issue.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 3 rows (seq 5062, 5129, 5149) carrying 3 sightings, all at `accumulating`.

In a third case Alan had to ask for an RCA agent explicitly, the agent not having moved to investigate why a regression passed both branch CI and the merge queue. All three are the same gap seen at three levels: the worker that does not stop, the orchestrator that cannot see it has stopped mattering, and the investigation nobody started.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
