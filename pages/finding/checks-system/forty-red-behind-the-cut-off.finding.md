---
page-type-slug: finding
slug: forty-red-behind-the-cut-off
title: "Forty test files behind the suite's cut-off are red, carrying 161 failing cases nothing has reported"
domain-slug: domain/checks-system
---

# Claim

The standard suite asks for 581 test files on every run and reaches the first 72. Behind that cut-off stand 40 files that fail, carrying 161 failing test cases. Every one of them is inside the suite's own declared population: the suite names them, asks for them by name, and stops before it reaches them.

Two seats have already filed why the suite stops short. Neither says what is behind the stop, and both record that nobody had measured it. This is that measurement, taken by running all 581 files.

The failures are not thin ones at the edge. `tools/tests/hold-seat.test.ts` fails 26 of its 30 cases. `tools/tests/oauth-page-push.test.ts` fails 18 of 20. `tools/tests/refusals-bound.test.ts` fails 12 of 19. Seat holding, oauth page writes, seat naming, subagent composition, page records and required reading are all red, and have been reporting it to nobody.

# Evidence

Measured 2026-08-28 at `f7d029f60`, on a workstation carrying six seats and their agents.

DENOMINATORS, EACH NAMED. Every count below is over akasha at `f7d029f60`, and `git ls-files` and a `Bun.Glob` walk of the tree agree on all of them, so nothing here is an untracked-file artefact.

    tracked *.test.ts and *.test.tsx, whole repository     2,417
    matching the suite glob `tools/**/*.test.ts`             688
      of those, held back by the `.on-demand` suffix         107
      the suite's unit population                            581
    outside `tools/` entirely                              1,729

The 581 is the number `suite-runs` asks for, and the number `tests-bounded` reports as `581 unit test file(s)`. It is a count over `tools/` and not over the repository.

A CORRECTION TO THE ARITHMETIC THIS STARTED FROM. The reported line `780 test(s) across 72 of 581 file(s) ... 107 file(s) held back` does not describe 72 run, 107 held back and 402 unexplained. `report` at `suite-runs.ts:104` prints `${tally.files} of ${asked}` where `asked` is the number the suite selected — so 581 is what it asked for and 72 is what it reached, and 509 files were asked for and not reached. The 107 on-demand files are a separate set alongside the 581, not a subset of it. Nothing is unaccounted for.

METHOD. I ran all 581 files, one file per `bun test` process, at `--timeout 1000`, bounded at 60 seconds each. That took 263.6 seconds of wall time and reported 43 files red — red meaning a positive fail tally or a non-zero exit.

Running against the live working tree proves little on a machine six agents are working, so I re-ran all 43 inside the environment the check itself uses: a worktree at `HEAD` created by `withSuiteTree` from `tools/lib/suite-tree.ts`, with `linkModulesInto` and the `suiteTreeEnv` roots, exactly as `suite-runs.ts:127` does it.

    red in the live working tree                    43
    still red in a clean worktree at HEAD           42
    green in the clean tree, so a live-tree artefact 1   (tools/tests/page-write-deferred.test.ts)

THE SPLIT THAT MATTERS. `unitFiles` sorts, and the suite reaches the first 72. Of the 42 files red in the clean tree:

    inside the 72 the suite reaches      2   carrying   2 failing cases
    behind the cut-off                  40   carrying 161 failing cases

The two it reaches are `tools/lib/check-workflow/checksum-annotation-substitution.unit.test.ts` and `tools/lib/check-workflow/tsconfig-graph-input-watch-trigger.unit.test.ts`. Those two are why `suite-runs` is red today. The other 40 are not why anything is red, because nothing has run them.

By directory, the 40 behind the cut-off are 1 under `tools/lib`, 2 under `tools/page` and 37 under `tools/tests`. All 446 files under `tools/tests` sit behind the cut-off, the first 72 falling entirely inside `tools/lib`.

THE HEAVIEST, WITH THEIR OWN DENOMINATORS.

    tools/tests/hold-seat.test.ts               26 of 30 cases fail
    tools/tests/oauth-page-push.test.ts         18 of 20
    tools/tests/refusals-bound.test.ts          12 of 19
    tools/tests/compose-seat-name.test.ts        9 of 22
    tools/tests/seat-answering.test.ts           8 of 16
    tools/tests/hold-seat-mode.test.ts           7 of 7
    tools/tests/oauth-page-identity.test.ts      7 of 9
    tools/tests/aw-reload.test.ts                6 of 7
    tools/tests/page-record.test.ts              5 of 7
    tools/tests/compose-subagent.test.ts         5 of 5

Four files fail every case they hold: `hold-seat-mode`, `hold-seat-order`, `hold-seat-warrants` and `compose-subagent`.

ONE FAILURE READ THROUGH, SO THE KIND IS NOT GUESSED AT. `refusals-bound.test.ts` fails twelve cases, most of them throwing `pages/refusal/refusal-slug-not-literal.md is not there, so there is no refusal to print` out of `refusalText` at `tools/lib/refusal.ts:25`, reached from `tools/audits/refusals-bound.ts:133`. The document is not missing from the repository — it stands at `pages/refusal/refusal-slug-not-literal.refusal.md`. It is missing from the synthetic tree each test builds. So the audit gained a refusal its own tests were never given, and the pairing has been broken ever since, reporting to nobody.

NOT ENVIRONMENTAL. The re-run used the check's own worktree and its own environment, so these are not failures of this machine's live state. The one file that was such an artefact is named above and excluded.

RED AT THE PARENT TOO, FOR THE TWO ALREADY KNOWN. `refusals-bound` at 7 pass / 12 fail and `record-read-concurrency.on-demand` at 8 pass / 7 fail were both established red at head and at the parent commit by the seat that found them. I reproduced both figures exactly at `f7d029f60`.

WHAT I DID NOT MEASURE, AND WILL NOT GUESS AT.

The 107 on-demand files under `tools/` were not run. They are held back by design and several want a live system that is not here, so a red among them would not distinguish a defect from a missing dependency.

The 1,729 test files outside `tools/` were not run. They are already on record as outside the gating suite's population entirely. Measuring their redness honestly means standing up each workspace's own environment, which is a job of its own, and a reading taken tonight on a box carrying six agents would not be worth quoting. How many of them are red is open.
