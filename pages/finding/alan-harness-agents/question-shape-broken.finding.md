---
id: 4aa07e87-0277-56fa-b0dc-ceb3877fb032
page-type-slug: finding
title: "Question shape broken"
domain-slug: domain/alan-harness-agents
---

# Claim

Questions reach Alan in a shape he has to correct. An agent presented three decision options at once and he replied `Okay, ask me one question at a time`; a second sighting of the same numbered-options motion is recorded separately. In the opposite direction an agent asked for input on an agent name it had standing authority to choose, and one assistant began creating a project without his explicit intent approval.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 4 rows (seq 5069, 5120, 5141, 5251) carrying 5 sightings, all at `accumulating`.

The correction was given to the `/c` orchestrator. The two directions are the same fault seen from either side: a menu spends his turn on judgment already delegated, and an unasked project spends his tree on intent he never gave.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
