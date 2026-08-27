---
id: 5b44ba19-57a5-56b4-aedb-e00444041652
page-type-slug: finding
title: "Retry with input unchanged"
domain-slug: domain/agent-harness
---

# Claim

Agents retry a call with the argument that made it fail still in place. Read was called twice with the same invalid `command` parameter; a python `set(...)[:30]` TypeError was reproduced by retrying the same broken slicing shape; a bash command that exited 123 was reissued unchanged. The retry is cheap enough to be taken before the error text is read.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 5 rows (seq 5070, 5186, 5188, 5189, 5190) carrying 7 sightings, all at `accumulating`.

The python case repeated at lines 558 and 615 of one trace. The exit-123 case retried at line 48 with the same issue. A further row records an agent re-attempting an approach it had already abandoned, across three sightings.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
