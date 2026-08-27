---
id: 47b55a9b-a78c-590e-b779-6806358e3f75
page-type-slug: finding
title: "Checks first run after commit"
domain-slug: domain/global
---

# Claim

Checks are first run against a change after it is committed, so their verdicts arrive as CI failures rather than local ones, and they arrive in waves: a first branch-CI run failed four checks at once after a sibling extraction with no pre-flight, and a second cycle then failed on a reason the first fix-up batch had not covered.

# Evidence

Read 2026-08-16 from live `issue` rows in `public.pages` (`deleted_at is null`): 239 stand, 230 `accumulating`, 4 `dispatched`, 4 `skipped`, 1 `obsolete`. Each row is one mined behaviour category and its `attributes.observations` holds an array of individual sightings.

Absorbs 6 rows (seq 5077, 5103, 5116, 5117, 5125, 5136) carrying 6 sightings, all at `accumulating`.

The four checks in the first wave are functional-type, hub-watchlist, file-length and syntax-bundle. The second cycle failed `check-bin-mode`, needing chmod 0755 on a new `bin` entry. A separate run failed `check-ast-unused` and `check-syntax-bundle` on newly added files, and another `check-docs-frontmatter`. Lint fails from the other side too: Biome rejected a just-written `seed-supervisor.unit.test.ts` for `noUnusedImports` because the scaffolding was written before the assertions that used it, and blocked a commit for `noUnusedFunctionParameters` where a positional arg was removed from a proc body but left in the signature.

NOT MEASURED: I read each row's title, kind, status and only the FIRST element of its `observations` array, so the sighting counts are measured and the wording past the first sighting in each row is not. I did not open the transcripts these were mined from, so every quoted detail is the miner's summary. I did not measure whether the behaviour still occurs: the register's rows were created between 2026-05-28 and 2026-07-01 and none since. I did not measure how the mining chose its categories, so the grouping here is my reading of the summaries. No page type document governs `issue`.
