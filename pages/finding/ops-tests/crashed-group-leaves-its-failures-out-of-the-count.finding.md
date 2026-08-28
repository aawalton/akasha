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
