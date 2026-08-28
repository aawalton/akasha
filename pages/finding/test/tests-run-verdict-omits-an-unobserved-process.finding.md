---
id: 76e180bf-1732-4d80-9bff-b9318a793b54
page-type-slug: finding
title: "ops tests run reports a clean tally for a run it did not observe"
slug: tests-run-verdict-omits-an-unobserved-process
domain-slug: domain/test
---

# Claim

`ops tests run` starts one `bun test` process per test type and builds its verdict only from the processes that printed a summary. A process that printed none is dropped from both the numerator and the denominator rather than reported. Its own help promises the opposite — that a run producing no summary is UNKNOWN and never a pass — so the guarantee the command is trusted for is not the one it keeps.

# Evidence

`ops tests run tools`, at HEAD on 2026-08-28, started three processes: `(no type suffix) — 568 path(s)`, `cli — 1 path(s)`, and `unit — 119 path(s)`. Only the last two printed `Ran N tests`: 5 tests with 0 failing, and 1,105 tests with 2 failing.

The first printed **142 `(fail)` lines and no summary at all**. The command answered `VERDICT: FAIL — the-named-test-suites: 2 failing test(s) [over 120 test files]`. 120 is 1 plus 119, so the 568-path process is absent from the denominator and its 142 failures are absent from the count. The verdict names 2 failures over a run in which 143 tests failed.

The failure word is right, so nothing downstream misreads a pass as a pass. What is wrong is the tally, and the tally is what an agent quotes. Two agents tonight reported `tools` as carrying 2 failures on this basis, and both were reading the same undercount.

`ops tests run --help` states the intended behaviour: "a signal death that produced no summary is UNKNOWN, never a pass", with exit code 2 reserved for it. This run exited 1. So the unobserved process was neither counted nor declared unobservable.

I did not establish why the first process printed no summary, nor whether the 142 failures are real or artefacts of 568 paths of mixed type sharing one process — which the same help warns about, `mock.module` being process-global. Either way the verdict speaks for a run it did not see.
