---
id: d75f884e-0d67-5759-98da-67ea6f2da1f1
page-type-slug: finding
title: "Shell command construction"
domain-slug: domain/agent-harness
---

# Claim

Multi-part bash commands fail on their own syntax before reaching what they were built to do. The costliest is the silent one: a multi-pipe command with embedded python failed without erroring and returned empty values, which reads exactly like a measurement of nothing.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 7 rows (seq 5065, 5072, 5143, 5194, 5200, 5202, 5243) carrying 8 sightings, all at `accumulating`.

Also recorded: an awk one-liner with bare comparison operators (`=="furnishings"||`), abandoned after the syntax error; a bash eval with an unexpected token; a command exiting 123; spawn variants failing against `/dev/stdin` across several retries; and a scanner chained with `&&` where the scanner's non-zero exit on findings dropped the downstream `jq` grouping, corrected by re-running with `;`.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
