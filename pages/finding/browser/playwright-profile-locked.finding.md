---
id: 10b35ba7-5d5d-5df2-82ce-7054e0fb0744
page-type-slug: finding
title: "Playwright profile locked"
domain-slug: domain/browser
---

# Claim

Playwright navigation fails with `Browser is already in use` from a stale profile lock, and `browser_close` does not clear it — one agent retried the close, got the same error, and only then fell back to inspecting the process and the lock file directly. Three sightings across two observation categories.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 2 rows (seq 5154, 5156) carrying 3 sightings, all at `accumulating`.

Both categories describe the same lock from either side: one names the contention and one names the retry thrash it produces. The fallback that worked was `ps` plus lock inspection rather than any browser tool.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
