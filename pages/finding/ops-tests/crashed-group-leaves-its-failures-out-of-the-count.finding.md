---
page-type-slug: finding
slug: crashed-group-leaves-its-failures-out-of-the-count
title: "A bun group that exits without a summary contributes none of its failures to the verdict's count"
domain-slug: domain/ops-tests
---

# Claim

`ops tests run tools` printed `VERDICT: FAIL — the-named-test-suites: 2 failing test(s)` on a run in which 143 tests failed. The count in the verdict is taken only from the bun groups that printed a result summary. A group whose process exits without printing one contributes nothing to the number, and on this run that group held 142 of the 143 failures.

The run is not silent about the group: it prints `[(no type suffix)] bun exited 1 without printing a test-result summary` on the line above the verdict, and it does exit 1. But the number a reader carries away is the one in the verdict, and that number was 2. A tree with 143 red tests reads as a tree with two.

This is the same hazard as a file that fails to resolve at import, one step further along: there, a group that ran nothing reports `0 fail`; here, a group that ran plenty and failed 142 times reports nothing at all into the total. In both cases the count understates rather than refuses.

# Evidence

Measured on 2026-08-28 on this workstation, running `ops tests run tools` on `main` at `56d9e6fa4`, output kept at `/var/tmp/akasha-tools-run-1.txt` (3,147 lines).

The command's own closing lines:

```
  [(no type suffix)] bun exited 1 without printing a test-result summary
  [unit] 2 failing test(s) — bun's own output is on stderr above
VERDICT: FAIL — the-named-test-suites: 2 failing test(s) [over 120 test files (denominator not computed)]
```

Counting bun's own `(fail)` lines over the whole output gives 143, spread over 31 test files. Splitting them at the group boundary — the second `bun test v1.3.14` banner, at line 3088 — gives 142 in the `(no type suffix)` group and 1 in the `unit` group. The `unit` group's own summary reads `1103 pass / 2 fail / 1 error / Ran 1105 tests across 119 files`; its second "fail" is the unhandled `createGraph` error rather than a `(fail)` line, which is why its two numbers differ by one.

So the verdict's `2` is the `unit` group's count alone. The 142 failures in the group that crashed are absent from it.

Why that group printed no summary: its last lines before the next banner are

```
error: `project` names nothing a seat holds — this call takes agent, persona, domain, role, task, initiative, errand, flex, principal, mode, parentName, account, resolve, name, show, default, fromSeat, onCall, clear, token
[tests run] cli — 1 path(s)
```

so something a case spawned took the process down before bun reached its own tally.

The per-file distribution of the 143, which sums exactly, is led by `tools/tests/relations-resolve.test.ts` (23), `tools/tests/oauth-page-push.test.ts` (18) and `tools/tests/domain-edges.test.ts` (13).

## A second arrival, from another direction

Reached independently the same day from the opposite end — auditing the verdict aggregator while ablating a name function, rather than auditing the failures themselves. Two arrivals at one defect from two directions is the best evidence available that it is real and load-bearing, and neither of us knew of the other's until after both had reproduced it.

The same command on a later `main` gave the same shape: three groups, `(no type suffix)` handed 568 paths printing 142 `(fail)` lines and no summary, `cli` printing `Ran 5 tests across 1 file` with 0 failing, `unit` printing `Ran 1105 tests across 119 files` with 2 failing, and the same closing `2 failing test(s) [over 120 test files]`.

The counts agree exactly, and this page resolves the one number that did not close from the other side. Counting `(fail)` lines gave 142 in the silent group and 1 in `unit`, against `unit`'s own summary of 2 — the discrepancy is the unhandled `createGraph` error this page already names, counted as a failure without printing a `(fail)` line.

**The denominator is the other half.** 120 is 1 plus 119: the silent group's 568 paths are absent from the file count as well as from the failure count, so the group is dropped from both sides of the fraction rather than from one.

**Reproduced away from the tree**, which places the defect in the aggregator rather than in bun or the environment: calling `verdictForNamedSuites` directly with three groups of exactly those shapes answered `reason: 2 failing test(s)` and `coverage: {"observed":120}`. Three lines in `tools/lib/run-named-suites.ts` produced it — `:100` summed `failTotals`, and a group with no summary has an empty one; `:106` summed `filesRan ?? 0`; `:136` reported that sum as the reason whenever it was above zero.

**One case neither reproduction covered.** Both groups here exited 1 rather than dying on a signal. A group that dies on a signal beside a group with real failures was a separate instance of the same fault: the crash branch stood *after* the failing-group branch, so a run holding both never reached it and reported the partial count. Confirmed by construction, exit 137 beside a failing group answering `2 failing test(s)`.

Both are now refused, and a run whose every group printed a summary still passes.
