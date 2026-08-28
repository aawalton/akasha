---
id: 0829e223-7667-45cf-8665-fbe767df1418
page-type-slug: finding
title: "A run that printed no summary is dropped from the verdict instead of voiding it"
slug: no-summary-run-is-dropped-from-the-verdict
domain-slug: domain/ops-tests
---

# Claim

`ops tests run` starts one `bun test` process per test type and builds its verdict only from the processes that printed a summary. A process that printed none contributes zero to the failure count and zero to the file count, so it is absorbed into both sides of the fraction rather than voiding the answer. The headline the command prints is then a tally taken from the processes that did report, presented as the tally for the whole run.

`pages/domain/ops-tests.domain.md:18` already rules on this: "A verdict is read from a run's own output beside its exit code, so a green suite that exited non-zero passes and a run that printed no summary certifies nothing." The design is right and written down; the implementation contradicts it in the exact case the line was written for.

# Evidence

`ops tests run tools`, at HEAD on 2026-08-28, started three processes. `(no type suffix)` was handed 568 paths, printed **142 `(fail)` lines and no `Ran N tests` summary at all**. `cli` was handed 1 path and printed `Ran 5 tests across 1 file`, 0 failing. `unit` was handed 119 paths and printed `Ran 1105 tests across 119 files`, 2 failing.

The command answered `VERDICT: FAIL — the-named-test-suites: 2 failing test(s) [over 120 test files (denominator not computed)]`. 120 is 1 plus 119, so the 568-path process is absent from the denominator, and its 142 failures are absent from the count.

Reproduced away from the tree by calling `verdictForNamedSuites` directly with three groups of exactly those shapes: it answers `reason: 2 failing test(s)` and `coverage: {"observed":120}`.

Three lines in `tools/lib/run-named-suites.ts` produce it. `:100` sums `failTotals` across groups, and a group with no summary has an empty `failTotals`, so it adds 0. `:106` sums `filesRan ?? 0`, so the same group adds 0 to the denominator. `:136` reports that sum as the reason whenever it is above zero, so a run holding an unobserved group is described by a count taken only from the observed ones.

The failure word is right, so nothing reads a red as green, and `findings` does carry an entry naming the silent group. What is wrong is the number beside the word, and the number is what a reader quotes. Two agents and I each quoted this undercount on 2026-08-28 before it was caught.

I did not establish why that process printed no summary, nor whether its 142 failures are real rather than artefacts of 568 paths of mixed type sharing one process, which `ops tests run --help` warns about, `mock.module` being process-global. Either way the verdict speaks for a run it did not see.
