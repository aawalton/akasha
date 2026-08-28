---
page-type-slug: finding
title: "A suite that dies at import counts as one failing test"
domain-slug: domain/checks-system
---

# Claim

A test file that throws while loading names no failing case and shrinks the run's own test count. bun answers `0 pass`, `1 fail`, `1 error`, prints an "Unhandled error between tests" block, and prints no `(fail)` line at all. `Ran N tests across M files` counts the dead file as one test however many it holds: the file count stays true and the test count does not.

So one suite that never loaded and one broken `expect` are the same figure. A file holding fifty-one tests contributes exactly `1 fail`, which is what a single wrong assertion contributes, and a scan for named failures over the run returns nothing.

A verdict quoted as "N pass / 0 fail across M files" is sound only if all M files loaded, and that sentence does not say whether they did. Two things go wrong there and only one of them shows. A file that loads and throws moves the failure count, the error count and the exit code, so `0 fail` does rule that one out. A file whose path bun never resolves is dropped in silence — exit 0, no error, no note — and only the file count, read against the number of files asked for, says so.

What a reader must check is the file count against what was asked for, and the test count against what those files hold. Not the failure count on its own, and not a scan for `(fail)` lines, which answers zero.

# Evidence

Measured 2026-08-28 against `main`, bun 1.3.14.

Positive control, composed for this and standing at `/var/tmp/probe/ctl/`. `dies.test.ts` holds three tests and throws at module scope; `lives.test.ts` holds four and passes.

    dies alone     0 pass  1 fail  1 error    Ran 1 test across 1 file
    lives alone    4 pass  0 fail             Ran 4 tests across 1 file
    both           4 pass  1 fail  1 error    Ran 5 tests across 2 files

Seven tests stand in those two files and the run claims five. `grep -c '^(fail)'` over the both-run answers 0.

Observed at scale, not only controlled. `014a2c82d` broke nine suites through `tools/tests/page-frontmatter-fixture.ts`, every one of them by dying at import. Run singly at that commit, all nine answer identically — `0 pass`, `1 fail`, `1 error`, `Ran 1 test across 1 file`, zero `(fail)` lines. What each file actually holds, measured after `f81673e20` let them load: `page-absence` 5, `page-closed-set` 12, `page-map-value` 11, `page-range-value` 7, `page-record` 7, `page-secret` 4, `page-frontmatter` 51, `page-narrowing` 37, `property-types-bind` 12.

146 tests stand in those nine files. Run together with one healthy suite of 17, the report reads `17 pass / 9 fail / 9 errors ... Ran 26 tests across 10 files`. Ten files is right; 26 is not, because 163 tests stand there.

Three of the nine were reported to the seat that dispatched me and six were not. The three were noticed because someone ran them one at a time and read the error block, not because any count showed it.

Fixing the silence revealed failures that predate it. Once `f81673e20` let the files load, `page-closed-set` reported 3 named failures and `page-record` 5. Both fail identically at `15f5d5c6f`, before `014a2c82d` — they were red before the import death began and unreported for as long as it lasted. The silence hides not only the suites it kills but everything those suites had already stopped saying.

A second shape, which the failure count does not catch. A path bun cannot resolve is dropped without a word as soon as one real file stands beside it: `bun test lives.test.ts nosuchfile.test.ts` answers `4 pass / 0 fail ... Ran 4 tests across 1 file` and exits 0, with no error and no note. Named on its own the same path does print a note and `2 files were searched`, so the silence arrives exactly when a run has other work to do, which is every real verification. Measured against the same two control files.

The two shapes divide cleanly on the exit code: a file dead at import exits 1, a file never reached exits 0, a healthy run exits 0. So `0 fail` is sound evidence that nothing died at import, and no evidence at all that everything asked for ran.

Not measured: whether `ops tests run` and `ops checks audit` read bun's counts and take the same reading, or whether either compares the file count against what it asked for.
