---
id: 4378e481-a148-5e1f-8f05-a9a539cc223e
page-type-slug: finding
title: "Edit before read"
domain-slug: domain/claude-code-tools
---

# Claim

Edit and Write are called on files the agent has not read in the current session, and the harness rejects them with `File has not been read yet`. Compaction is one path in: an agent that read a file before a compaction boundary issues the edit after it as though the read still counted.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 5 rows (seq 5094, 5099, 5105, 5241, 5247) carrying 6 sightings, all at `accumulating`.

One row records Edit-before-Read issued three times consecutively (lines 276, 285, 299) rather than once. The compaction case is an edit to `ci-pipeline-execution-model.md`. Two further rows record the same rejection under the names `tool-requirement-violation` and `tool-usage-error`, one of them for Write rather than Edit.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
