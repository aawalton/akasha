---
id: 35a7420d-55ca-55a1-b953-7354fa7722d8
page-type-slug: finding
title: "System shape assumed wrong"
domain-slug: repo/code-repo
---

# Claim

Agents hold a shape for this system that it does not have, and act on it before testing it. A pure-polling worker was built on `runLongRunningWorker` with `subscribers: []` and crashlooped at code 0 where the canonical pattern is a hand-rolled while loop — thirty-one sightings under that one category. An agent believed merge-queue batches were Kubernetes pods and queried pods for them.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 8 rows (seq 5132, 5193, 5250, 5269, 5273, 5280, 5281, 5283) carrying 14 sightings; 7 at `accumulating` and 1 at `dispatched` (seq 5273), so part of this was already handed to somebody.

Also recorded: `browser_run_code_unsafe` given `process.env.BROWSER_TEST_*` inside the page context, failing with `process is not defined`; PGlite returning timestamp columns as Date objects rather than strings, needing cache normalization; `updatedAt` existing both as a top-level column and inside attributes JSON, the mismatch causing a cache miss; documentation claiming an empty string clears an override, contradicted by an `if (!name)` check in VSCode; and `set -a && source .env.local` in alanwalton/web where no such file exists for that app. Alan asked why 50-item batches were slow and the answer was sequential individual creates where a bulk upsert path had been assumed.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
