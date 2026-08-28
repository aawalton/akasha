---
page-type-slug: finding
slug: one-batch-spends-the-whole-budget
title: "The suite stops at 72 files because one batch of eight consumes the entire deadline and counts as nothing"
domain-slug: domain/checks-system
---

# Claim

The standard suite reaches 72 of the 581 test files it asks for, and the reason is not that 72 files fill its budget. Those 72 cost 6.4 seconds. The budget is consumed by the single batch of eight that comes next, which never returns and is killed when the clock runs out.

The suite runs its files in sorted order, eight to a process, and gives each process whatever is left of the checks run's 120-second deadline. Batch ten is handed the remaining budget, spends all of it, and is killed. A killed batch reports no summary, so it contributes nothing to the tally — the count stays at 72 — and the next turn of the loop sees no budget left and stops. Every file from index 72 on is left unrun, which is all 446 files under `tools/tests/`.

This is why the figure is 72 on every run rather than drifting with load, and why the whole checks run lands just past its 120-second ceiling every time. Two seats read the same numbers as a budget gradually exhausted by too much work. It is one batch that does not come back.

# Evidence

Measured 2026-08-28 at `f7d029f60`, on a workstation carrying six seats and their agents.

THE POPULATION. `tools/audits/suite-runs.ts:17` sets `SUITE_GLOB = "tools/**/*.test.ts"` and `unitFiles` at `:25-32` scans it, dropping every path ending `.on-demand.test.ts` and sorting the rest. At this commit that is 581 files: 122 under `tools/lib`, 13 under `tools/page`, 446 under `tools/tests`. A further 107 carry the on-demand suffix, so 688 files match the glob.

HOW THE LOOP SPENDS ITS BUDGET. `suite-runs.ts:146-160`:

    const deadlineAt = repo.deadlineAt ?? Date.now() + CHECKS_CEILING_MS
    for (let at = 0; at < files.length; at += BATCH) {
      const budgetMs = deadlineAt - Date.now()
      if (budgetMs <= 0) break
      const run = Bun.spawnSync({ cmd: [...], timeout: budgetMs })

`BATCH` is 8 (`:21`). `deadlineAt` is not this check's own clock: `run-checks.ts:165` computes `const deadlineAt = startedAt + ceilingMs` and `:197` passes it into every check, and `ceilingMs` defaults to `CHECKS_CEILING_MS`, which `tools/lib/check.ts:15` sets to 120_000 — the same 120 seconds `checks-ceiling` judges the whole run against.

So each batch is handed *everything left of the whole run's budget*, not a share of it.

REPRODUCED. I ran the 581 files in the suite's own environment — a worktree at `HEAD` built by `withSuiteTree` from `tools/lib/suite-tree.ts`, with its `tree.env` — in sorted order, eight to a process, the same shape the check uses, with each spawn bounded at 120s:

    batch  7 at  48 took     262ms   elapsed   5.3s   cum-files  56
    batch  8 at  56 took     326ms   elapsed   5.7s   cum-files  64
    batch  9 at  64 took     709ms   elapsed   6.4s   cum-files  72
    batch 10 at  72 took  120476ms   elapsed 126.8s   cum-files  72
    batch 11 at  80 took     280ms   elapsed 127.1s   cum-files  80
    batch 12 at  88 took     250ms   elapsed 127.4s   cum-files  88

The first 72 files cost 6.4 seconds. Batch ten cost 120.5 seconds — the whole bound — and was killed. `cum-files` does not move across it.

WHY A KILLED BATCH COUNTS NOTHING. `tallyOf` at `:55-71` returns `{ ...NOTHING, named }` when `exitCode === null`, and `NOTHING` carries `files: 0`. A batch killed on its timeout produces no `Ran N tests across M files` line, so it adds no files and no tests. The tally therefore reads 72 whether batch ten ran nothing or ran eight files and died at the end.

THAT ACCOUNTS FOR THE PRODUCTION LINE EXACTLY. `bun run tools/run-checks.ts tests-bounded suite-runs` on a clean tree reported `780 test(s) across 72 of 581 file(s)` and `[checks-ceiling] fail 123.4s against a 120s ceiling`. 72 is batches one to nine. The 123.4s is 6.4s of work plus a batch that consumes the rest of the deadline plus the run's own overhead.

IT ALSO ACCOUNTS FOR THE LOAD-INSENSITIVITY already on record. Three idle readings at 122.8s, 123.0s and 123.1s, and readings under load ~38 at 123.3s and 124.9s, were read as the signature of a deadline rather than a workload. That reading was right, and this is the deadline being consumed: not 120 seconds of tests, but 6 seconds of tests and one batch that does not come back.

THE WHOLE SUITE, RUN THE SAME WAY. I let that run continue through all 581 files, with no deadline other than the 120-second bound on each batch. It ended:

    FULL SUITE: 6182 tests across 565 of 581 files in 428.9s over 73 batches

The spread is not even. Five batches carry nearly all of it:

    batch 10 at  72   120476ms   killed at the bound, contributed 0 files
    batch 16 at 120    60064ms   finished, contributed 8 files
    batch 48 at 376   120564ms   killed at the bound, contributed 0 files
    batch 58 at 456    10800ms   finished, contributed 8 files
    batch 73 at 576    34746ms   finished, contributed 5 files
    the other 68 batches together        82.3s

Two batches never returned inside two minutes and were killed, which is why 16 of the 581 files were never measured at all. Batch ten holds indices 72-79; batch 48 holds indices 376-383, which is `pages-hold-properties.test.ts`, the five `parse-args*` files, `pending-decide.test.ts` and `pid-signal.test.ts`.

THE CEILING IS NOT REACHABLE EVEN WITH THE TWO HANGS REPAIRED. Setting aside the 241 seconds the two killed batches consumed, the 565 files that do finish cost about 188 seconds. That does not fit inside a 120-second deadline `suite-runs` shares with every other check in the run. This box was carrying six seats and their agents throughout, so a quiet machine would be quicker and I am not putting a figure on the gap; but 188 against 120 is not a margin load explains away.

So the answer to whether the overrun is chronic or was one night's load is that it is chronic, and it has two independent causes rather than one: a batch that does not terminate, and a suite that is larger than its budget even when every batch does.

WHICH FILE, NOT SETTLED. Batch ten holds indices 72-79: `tools/lib/seat-proc-key.unit.test.ts`, `tools/lib/seat-usage.test.ts`, `tools/lib/subjects.unit.test.ts`, and five generators under `tools/lib/temper-addon-data/generators/`. Run one at a time in a clean worktree, `tools/lib/subjects.unit.test.ts` exceeded a 60-second bound and produced no summary, which points at it — but run one at a time in the live working tree the same file finished in 3.8 seconds with one ordinary failure, and a different file, `tools/page/document/parse.test.ts`, was the one that exceeded the bound. Batch sixteen, which holds `parse.test.ts`, also stalled past 60 seconds in this run. Six other seats were working the box throughout, so I cannot separate a genuine non-termination from contention, and I am not claiming which file it is.

WHAT DOES NOT DEPEND ON THAT. The batch loop hands one process the entire remaining budget and treats a process killed for exceeding it as having run nothing. That holds whatever is inside the batch, and it means one slow or hanging file stops the suite at wherever it happens to sit — silently as far as the count is concerned, since the tally simply does not advance.

NOT A CONSEQUENCE OF THE DEAD GREEN ALONE. The recorded green `d9e356a9` is not an object in this repository, so `selection` falls back to asking for all 581 files, and that is filed. But the fallback is not what spends the budget here: 581 files is not 120 seconds of work. A selection of eight that happened to include the stalling file would spend the same 120 seconds and report the same overrun.

WHAT IS STILL NOT SETTLED. The 188-second figure excludes 16 files nothing has ever timed, so it is a floor rather than the suite's cost. Whether the two non-terminating batches share one cause is unknown. And every reading here was taken on a loaded box; the ordering of the four slow batches was stable across runs, but their durations were not measured on a quiet one.
