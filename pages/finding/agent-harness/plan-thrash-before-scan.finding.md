---
id: ea6a7749-fd31-5642-9b91-636edc1e8e38
page-type-slug: finding
title: "Plan thrash before scan"
domain-slug: domain/agent-harness
---

# Claim

Plans are formed before the scan that would have sized them. One plan predicted a callsite migration `should be empty or near-empty` before any local scan; the scan returned 132 and 98 violations across 79 files and the work had to be re-sequenced. Reversals also land mid-sentence, one agent proposing to commit a scanner before migrations and reversing itself on realising the worktree would fail.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 6 rows (seq 5127, 5128, 5151, 5192, 5223, 5294) carrying 6 sightings, all at `accumulating`.

A subagent thrashed across five consecutive reconsiderations (lines 241, 246, 249, 252, 257) over blocked-cascade semantics, and another across repeated `Actually wait` switchbacks over whether to remove `loadWorkflowPageBlobs`. One agent spent several turns hypothesising whether a bug or a proposed design was in front of it. Alan supplied one of these corrections himself, asking whether a lock that was a performance optimization could simply be removed until needed, where the agent had complicated the fix instead.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
