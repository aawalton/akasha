---
id: 439aa7e8-c653-5640-bcff-cda6dde356d1
page-type-slug: finding
title: "Stale background ids"
domain-slug: domain/agent-harness
---

# Claim

Agents hold background-task and cron ids that no longer name anything, and `TaskStop`, `TaskOutput` and `CronDelete` each return no such task or job. One id was invented outright. The registry purges a task on completion, so a `TaskCheck` issued just after that task announced it was done returns `No task found`: the id was right and the row was gone.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 7 rows (seq 5083, 5102, 5211, 5216, 5217, 5222, 5224) carrying 13 sightings, all at `accumulating`.

Ids recorded as stale: `b4i01s5bf` (twice, under `TaskStop` and under `taskstop-on-finished-task`), `b6klz43re` after a resume, `b3jzhm4nb` after a compaction, and cron `f12b13bf` from a prior session. The invented one is `wake_1764272760`, passed to CronDelete and found to be fabricated only after listing the real crons. The race case is `TaskCheck` on `bssdrfetw`.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
