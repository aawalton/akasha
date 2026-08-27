---
id: af25a751-141d-5d8d-a3ae-a67c72957987
slug: deploy-retried-not-diagnosed
page-type-slug: finding
title: "Deploy retried not diagnosed"
domain-slug: domain/deploy
---

# Claim

Deploys fail and are retried in sequence, with the diagnosis arriving later than the retries — one session ran four sequential deploy retries needing rebase fix-up, and another required Alan to say `bun ops project rebase first, then run the deploy again` because the agent had retried on a stale base.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 10 rows (seq 5087, 5088, 5089, 5130, 5133, 5148, 5155, 5159, 5271, 5277) carrying 12 sightings, all at `accumulating`.

Other deploys aborted before running: `sync_drift` on an uncommitted `bun.lock` after `bin` was added to a package.json, and a sync conflict at step 1/7 in `_reset-test-helpers.ts` because main had landed a competing change during the Checks iteration. Verification after a deploy fails as its own event: a live supervisor still returned an empty scriptPath despite the code fix, a verification script exited 1 after completion, and a live pod was found running feature-branch code rather than main. One row records a built extension missing from disk. One agent ran `project check` in the foreground during a deploy where background polling was the pattern.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
