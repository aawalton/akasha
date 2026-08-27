---
id: ccd3b6de-153e-51d7-9a4f-f4f236d7f4b7
slug: worktree-path-and-cwd
page-type-slug: finding
title: "Worktree path and cwd"
domain-slug: domain/worktree
---

# Claim

Paths lose their worktree prefix and shells outlive the worktree they stand in. Subagents read paths without the seq-numbered prefix that makes them real, and one relative Read ran with cwd `/home/aawal/code` from inside a subagent meant to be in a worktree. In the other direction, two sessions ended with `pwd: getcwd: cannot access parent directories` because the worktree was removed while a shell was still inside it.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 10 rows (seq 5107, 5140, 5198, 5218, 5266, 5267, 5268, 5274, 5275, 5284) carrying 17 sightings, all at `accumulating`.

Missing-prefix reads include `/home/aawal/projects/infra/ci/worker/...` and `~/projects/11459/worktree`, and one read `/projects/infra` where `/projects/11375` was meant. One subagent cd'd into `/home/aawal/projects/11445/worktree` after that worktree had been removed earlier in the same trace. The two getcwd failures are `ops project finish` and a cleanup phase. Bun module resolution also failed where a relative path from `/tmp` was used instead of an absolute workspace path.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
