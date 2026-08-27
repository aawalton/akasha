---
id: b64fae23-0038-5536-b4bd-643d420631d9
page-type-slug: finding
title: "Rebase conflicts on shared docs"
domain-slug: domain/global
---

# Claim

Rebase conflicts land on the same shared documents repeatedly — the orchestrator CLAUDE.md trio appears as a three-file conflict in three separate sightings, and worker/CLAUDE.md in another where the agent had edited the same area it was rebasing over. In one case the rebase revealed the whole child project was wasted: the work was already on main via another project and would have regressed a third.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 6 rows (seq 5111, 5172, 5175, 5176, 5178, 5210) carrying 10 sightings, all at `accumulating`.

`ops project rebase` also aborts outright when the worktree is dirty, which is reached by rebasing before committing. One conflict arose during a deploy attempt, under `rebase --continue`. The wasted child project is Deploy 2 against work already landed via #11395, which would have regressed #11390.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
