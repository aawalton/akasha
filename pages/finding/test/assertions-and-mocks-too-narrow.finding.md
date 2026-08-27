---
id: c7d3916c-6c67-56a3-954c-723d68c11ee6
slug: assertions-and-mocks-too-narrow
page-type-slug: finding
title: "Assertions and mocks too narrow"
domain-slug: domain/test
---

# Claim

Test scaffolding is written to the case in hand rather than to the contract. Alan flagged exact canary counts asserted as fixed values in a unit test; a flaky test was traced to a wall-clock dependency where `sleep(85)` plus an assertion is at the mercy of a slow CI runner; shared mock helpers returned empty or invalid shapes for newly added code paths.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 4 rows (seq 5076, 5108, 5201, 5285) carrying 4 sightings, all at `accumulating`.

The mock case failed three reset.database tests, the shared runGit and K8s helpers not covering the new discover and waitForRollout paths. A freshly written test also carried a wrong `OperationalError` import path, self-corrected in the next turn.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
