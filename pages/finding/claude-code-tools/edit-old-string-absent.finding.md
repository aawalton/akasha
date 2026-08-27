---
id: 868da3ee-ef44-5edf-894e-151b51a52a2f
slug: edit-old-string-absent
page-type-slug: finding
title: "Edit old string absent"
domain-slug: domain/claude-code-tools
---

# Claim

Edit fails because the `old_string` supplied is not in the file, and the register separates five ways that happens: a shorthand the agent invented, a block it expected without checking, a string its own prior edit made stale, a string a linter made stale between the Read and the Edit, and a string present more than once with `replace_all` unset.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 7 rows (seq 5092, 5095, 5096, 5097, 5098, 5212, 5214) carrying 7 sightings, all at `accumulating`.

The invented shorthand is `pipeline-{worker,orchestrator}`, a brace expansion the agent wrote as though it were literal text in the file; it appears under two separate categories. The expected block is a Cross-references section in `merge-queue-design.md` that is not there. The linter case failed with `File has been modified since read` and required a re-read: the file changed underneath a read the agent had correctly taken. The non-unique case failed twice, at lines 131 and 185, without `replace_all` being set after the first failure.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
