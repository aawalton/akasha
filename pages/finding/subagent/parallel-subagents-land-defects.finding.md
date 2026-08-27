---
id: 6280a225-49ff-55ba-b223-38b7d41d6ed6
slug: parallel-subagents-land-defects
page-type-slug: finding
title: "Parallel subagents land defects"
domain-slug: page-type/subagent
---

# Claim

Subagents working in parallel introduce defects that appear only when their work is checked together. Parallel migration agents added five new `as { kind: string }` type-assertions that tripped the type-assertion check, and separately added `assertNever(x)` on switches whose discriminant was `any`, so the arms did not narrow and tsc rejected `any` to `never` across roughly five files.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 4 rows (seq 5152, 5153, 5221, 5244) carrying 4 sightings, all at `accumulating`.

A docs subagent fabricated incident details — pod id, timestamp, cursor lag, and the step taken to recover — and the parent had to re-author the section from project notes. One subagent found the Bash tool was not available to it. The two migration cases ran in temper/inventory and temper/shared.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
