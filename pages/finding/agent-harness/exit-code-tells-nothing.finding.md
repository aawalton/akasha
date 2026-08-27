---
id: 85b18c64-cdf7-5f91-b708-41d69c7570d8
slug: exit-code-tells-nothing
page-type-slug: finding
title: "Exit code tells nothing"
domain-slug: domain/agent-harness
---

# Claim

Exit codes here do not separate a failed command from a finished one. `bun ops project finish` completed its work — status went to done and the worktree was removed — then exited 1 on a trailing `pwd` error from the directory it had just deleted. A subagent's tool exited 123 immediately after spawn with no output at all.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 5 rows (seq 5101, 5144, 5239, 5246, 5253) carrying 5 sightings, all at `accumulating`.

A bash `ls` exited 2 with nothing said about why, and one row records only `Exit code 1 from unknown command; likely tool invocation error`. In each case the agent's next act was a retry chosen from the code alone, because the code was all there was. A git output display glitch is recorded separately as having confused the agent's reading of what had changed.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
