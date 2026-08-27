---
id: 19ba4798-34d9-53bb-b871-b87f26d28e3e
slug: sleep-poll-instead-of-monitor
page-type-slug: finding
title: "Sleep poll instead of monitor"
domain-slug: domain/agent-harness
---

# Claim

Agents wait by chaining `sleep` into a read — `sleep 60` then `tail`, `sleep 30 && kubectl`, `sleep 30 && tail` — and the harness sleep guard blocks it and names Monitor with an until-loop instead. Where no guard catches it the cost falls on Alan: one session carries six near-identical `Continue waiting on #11445 deploy` prompts because the agent did not reschedule itself.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 5 rows (seq 5074, 5112, 5123, 5203, 5204) carrying 6 sightings, all at `accumulating`.

The six manual prompts stand at lines 1568, 1581, 1603, 1697, 1716 and 1750 of one trace, with a seventh at 1774. Three separate categories record the guard firing on a chained sleep, under the names `chained-sleep-wait-anti-pattern`, `sleep-chain-anti-pattern` and `sleep-poll-instead-of-monitor`, and a fourth under `harness-feature-misuse`.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
