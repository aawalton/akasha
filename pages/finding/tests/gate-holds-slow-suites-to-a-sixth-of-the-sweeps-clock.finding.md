---
id: db178e5a-efe8-5ff7-8028-d263ed8a122f
slug: gate-holds-slow-suites-to-a-sixth-of-the-sweeps-clock
page-type-slug: finding
title: "Gate holds slow suites to a sixth of the sweeps clock"
domain-slug: domain/global
---

# Claim

The branch-side slow-suite gate runs every suite at bun's 5-second default per-test timeout while the nightly sweep runs the same suites at 30 seconds, and the gate's base-side control cannot separate a load-induced timeout from a real branch defect: non-reproduction on base is what both look like, and the attribution charges it to the branch.

# Evidence

THE TWO TIMEOUTS ARE ASYMMETRIC BY CONSTRUCTION. `packages/infra/tests/src/run-selected-suites.ts:20-21` inserts `--timeout <ms>` only when `timeoutMs` is given. `run-slow-suite-sweep.ts:71` sets `SWEEP_TEST_TIMEOUT_MS = 30_000` and line 172 threads it to every shard. `packages/infra/tests/src/tests/slow-suite-gate.ts` passes no `timeoutMs` at all, and `run-selected-suites.unit.test.ts:14` pins that as intended — "omitting timeoutMs yields no --timeout (gate keeps bun's 5s default)". So the branch gate holds a suite to six times less than the nightly holds the same file.

THE MARGIN IS THIN FOR THE CLASS. `cli`-class tests do real git work in temporary trees, so the per-test cost is seconds and the gate's ceiling is a small multiple of it. Under gate load — several slow suites in one run — a test crossing 5s is a load outcome rather than a code outcome, and the gate has no way to say so.

THE CONTROL CANNOT TELL THE TWO APART. `attribute-slow-suite-failures.ts` carries three verdicts, and `unknown` exists for exactly one condition: a baseline that could not be obtained, at line 337, guarded by `baselineFromRun` refusing a base run that printed no summary. A branch failure that simply did not reproduce on base takes the other arm — line 385 reports that N failures "do NOT reproduce on the base side", which is the branch-attributed reading. A timeout flake does not reproduce reliably anywhere, so it lands in that arm and is charged to a branch that did not cause it.

WHAT THE COST IS. The remedy that presents itself to the seat is re-running the gate, which is indistinguishable from the response to a genuine intermittent defect. An estate that learns to re-run this gate has lost the signal it exists to give.

NOT MEASURED. Which slow suites sit on comparable margin — only whole-file times have ever been taken, never a per-test distribution — and whether any suite can raise the ceiling for itself under the gate as `SWEEP_ENV_INCOMPATIBLE_SUITES` lets one opt out of the sweep.
