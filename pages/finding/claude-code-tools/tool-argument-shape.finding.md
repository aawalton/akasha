---
id: 399a5204-a9fc-5f8e-b328-e1899d7456a3
page-type-slug: finding
title: "Tool argument shape"
domain-slug: domain/claude-code-tools
---

# Claim

Tool arguments arrive in the wrong shape rather than with the wrong value. Read was called with `offset` as the string `"[265, 310]"` and, separately, as `200, "limit": 30` — a second key packed inside the first key's string value. `TaskOutput` was typed as a bash command. An agent reached for `fd`, which is not installed here.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 5 rows (seq 5124, 5230, 5231, 5240, 5252) carrying 5 sightings, all at `accumulating`.

Both offset cases treat a single integer parameter as a range, one of them from an Explore subagent, and both returned InputValidationError rather than a result. The `TaskOutput` case returned `command not found` from bash before being retried as a proper tool call.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
