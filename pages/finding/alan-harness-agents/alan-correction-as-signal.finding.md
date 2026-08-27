---
id: 620b1e21-cff8-5046-99fc-cbec9246ce8d
page-type-slug: finding
title: "Alan correction as signal"
domain-slug: domain/alan-harness-agents
---

# Claim

Alan's corrections arrive as tool rejections and as challenges, and they carry what the agent had not reached on its own. He rejected `bun ops project check --seq 11396` after the agent had committed a scanner and 79 migrations in two commits without bundling the implementation-coupled CLAUDE.md change, and corrected the agent's reading of incident timestamps where 03:09 and 03:18 were not error times.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 4 rows (seq 5258, 5259, 5260, 5262) carrying 4 sightings, all at `accumulating`.

A second rejection followed earlier write-before-read friction. In one case the agent deferred to his challenge and opened a verification rather than trusting its own trace, which is the register's only sighting of a challenge answered by measurement rather than by assent.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
