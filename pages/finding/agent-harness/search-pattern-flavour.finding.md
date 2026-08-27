---
id: 98826995-d422-5677-8d1d-0e7858eefc98
page-type-slug: finding
title: "Search pattern flavour"
domain-slug: domain/agent-harness
---

# Claim

Search patterns are written in a regex flavour the tool here does not speak. `ugrep` is what runs, and it read an unbraced `{` as a repeat operator, an alternation as an empty subexpression, and an escaped-paren group as a POSIX empty-subexpression error. Shell metacharacters go the same way, with glob patterns passed through unescaped.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 5 rows (seq 5110, 5119, 5183, 5184, 5255) carrying 5 sightings, all at `accumulating`.

The unbraced brace is `^\+.*\bas \{|^\+.*as { kind`, which exited 2 with `invalid repeat`. The alternation is `\|import { runCmd\|...`, failing at column 68. The POSIX case is `getSavedVariables\(\)\.\(...\)`. The unescaped globs are `!` and `*/`. One grep was also invoked with three bare paths and `2>/dev/null` as though that shape were valid.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
