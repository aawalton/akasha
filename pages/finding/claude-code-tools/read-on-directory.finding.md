---
id: 2aa63b0d-efbb-53e6-a1b1-af4a9f63bffc
slug: read-on-directory
page-type-slug: finding
title: "Read on directory"
domain-slug: domain/claude-code-tools
---

# Claim

Agents call the Read tool with a directory path and get EISDIR back. Thirteen separate observation categories record this one motion, across parent agents and subagents alike. The failed call is the first thing that tells a directory from a file, and in one case an agent repeated the identical directory-read error it had already watched fail.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 13 rows (seq 5165, 5168, 5169, 5171, 5173, 5174, 5177, 5185, 5237, 5238, 5242, 5296, 5297) carrying 21 sightings, all at `accumulating`.

Directory paths passed to Read include `packages/shared/worker-supervisor`, `packages/shared/design/layout`, `packages/workers/pipeline-orchestrator`, `/packages/agents/devops-monitor`, `/home/aawal/.claude/skills/r` and `8297_reassign-stale-user-id`. One row records the same wrong target retried three times across subagents before a listing tool was reached for; another records an agent repeating an error a sibling agent had already produced.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
