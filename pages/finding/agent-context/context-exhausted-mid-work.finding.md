---
id: b514cdbd-7034-55d7-91fd-7a763e86557f
slug: context-exhausted-mid-work
page-type-slug: finding
title: "Context exhausted mid work"
domain-slug: domain/agent-context
---

# Claim

Sessions run out of context mid-project and are auto-summarised and resumed, twice within one conversation in one recorded case. State the agent was tracking does not survive the boundary: a background task id was called after compaction with no live task behind it, because the id was held in context rather than re-read.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 3 rows (seq 5081, 5082, 5215) carrying 4 sightings, all at `accumulating`.

One row records the window exhausted twice in a single long exploratory loop, the second time at line 1232. The lost-id case is `TaskOutput` called with task_id `b3jzhm4nb` across a session-resume boundary. A separate finding on `claude-code-tools` records Edit-before-Read arising from the same boundary.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
