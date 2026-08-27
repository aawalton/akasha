---
id: 6b3710b6-3643-5e11-9733-c833ab97590e
slug: read-over-token-cap
page-type-slug: finding
title: "Read over token cap"
domain-slug: domain/claude-code-tools
---

# Claim

Reads are rejected for exceeding the token cap, and a small file is no protection: a 200-line CLAUDE.md returned 36k tokens against a 25k cap. The rejection carries the file's token size, so a second attempt is informed where the first was not, yet the register records agents reissuing the same unbounded read before switching to offset/limit.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 11 rows (seq 5106, 5146, 5150, 5180, 5181, 5205, 5227, 5229, 5245, 5254, 5265) carrying 20 sightings, all at `accumulating`.

At the large end an agent attempted a 757K-token file whole, and another a 470KB file against a 256KB cap. At the small end a 170-line CLAUDE.md was retried whole twice after each 36k-token rejection, and a 200-line one exceeded the 25k cap. One agent recovered by pivoting from Read to a grep search rather than by bounding the read.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
