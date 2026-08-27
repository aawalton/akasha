---
id: a579cc1c-ff32-52eb-8fdc-ec4a36f1e88c
page-type-slug: finding
title: "Incident found after deploy"
domain-slug: domain/global
---

# Claim

Production faults are found by running against them rather than by a check. A deploy step's HTTP cutover deleted all ten workers with an empty `toAdd` set, sending the supervisor to empty-boot and taking CI out for roughly three minutes. Data corruption in the form of fake dungeon entries was found only after Alan corrected the agent.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 3 rows (seq 5086, 5093, 5158) carrying 3 sightings, all at `accumulating`.

A third row records slug-keyed hydration still firing where view-keyed should have been active, found by inspection rather than by an instrument. In each of the three the fault was already live when it was seen.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
