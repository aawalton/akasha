---
id: 9b89eefa-84cf-5a61-907e-c83decd7ce77
page-type-slug: finding
title: "Classification needs what code cannot say"
domain-slug: domain/test
---

# Claim

54 of `check-test-classification`'s 60 violations carry information that is not present in the code and cannot be derived from it — which lane an expensive test needs, and whether a spawn is hermetic. Its detection is also raw string containment, so a package named in a comment certifies a file as importing it.

# Evidence

Measured by running the check against project-19104's worktree, where the sweep had removed every `// test-classification:` and `// process-start: hermetic` declaration: 60 violations over 3758 test files, in three classes.

33 report `the marker is missing` — a file named `.model.test.ts`, `.integration.test.ts` or `.cli.test.ts` where the removed comment was the only thing placing it in that lane. Twelve are GPU inference tests under `packages/infra/inference`, and nothing in their source says a model server is needed.

21 report a process start — the file spawns and is declared `unit` or `integration`. This half is already PARSED rather than string-matched, a migration made after two files were found choosing a spawn spelling in comments to stay in the merge bucket. The comment carried a human warranting the spawn hermetic, which parsing does not decide.

6 are genuine mismatches on real imported evidence, curable by renaming. `test-preload-obligations.unit.test.ts` is declared unit and imports `@shared/supabase-test-harness`.

Detection is `rule.tokens.filter((token) => content.includes(token))`, raw containment over file content. `install-from-live.database.test.ts` and `uuidv7.database.test.ts` were certified `database` by a prose header naming `@electric-sql/pglite` and `@shared/supabase-test-harness`. Both import only `bun:test`, `./index` and `./install-from-live`. The lane is right, since both call `withTx` from inside the harness; the evidence never was.

The asymmetry shaping any repair: a test in a lane costlier than it needs is wasteful, while one in a cheaper lane silently does not get what it requires. The 33 are the safe direction and their filename already states the lane; the 21 are the unsafe one, where a human warrant is load-bearing.

NOT MEASURED: whether the 33 filenames are right — I checked that no rule matched their content, not that each needs its lane. I did not open the 21 to judge whether any spawn is truly non-hermetic. `check-worker-shape` I have not examined. One reading of one branch.
