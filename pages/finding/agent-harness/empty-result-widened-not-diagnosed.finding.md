---
id: 9f507435-bbd1-5ac7-b9e0-ed0fb7eb2e46
page-type-slug: finding
title: "Empty result widened not diagnosed"
domain-slug: domain/agent-harness
---

# Claim

An empty search result is answered by widening the search rather than by asking whether the search could have matched. A targeted kubectl query returning nothing was followed by a broader list; a Loki log-fetch by a different strategy; a bash command producing empty output by a simpler shape. In one case the empty result was the true answer about the data's structure and was read as a defect in the query.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 5 rows (seq 5091, 5115, 5167, 5187, 5264) carrying 5 sightings, all at `accumulating`.

A fifth row records the opposite failure: a subagent's search scope missed the codec files in an equipment migration, so nothing came back empty at all and the gap surfaced later as fix-up commit d5e6d23. Together these are the two ways a search's population goes unstated — one where nothing matched and one where the search could not look.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
