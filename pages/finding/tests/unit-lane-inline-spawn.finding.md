---
id: 11ff52d0-55e4-58fd-b58e-7b934bb93b32
slug: unit-lane-inline-spawn
page-type-slug: finding
title: "Unit lane inline spawn"
domain-slug: domain/global
---

# Claim

Two `*.unit.test.ts` files in the hermetic merge-gate lane spawn real subprocesses, and both of the guards over that lane are blind to them: the classifier's `cli` tokens fix the first argv element as `bun` or `node`, and the hermeticity walk sees only reach into a registered boundary module, not a `Bun.spawn` call the test makes itself.

# Evidence

Measured at code head `d01942409a`.

`packages/agents/shared/agent-name-bind.unit.test.ts:29` runs `Bun.spawn(["sleep", "60"], { stdout: "ignore", stderr: "ignore" })` at module scope, killing it in `afterAll`, and reads `/proc/<pid>/stat` around line 39 to walk its own ancestry. `packages/agents/supervisor/src/supervisor-handoff.unit.test.ts:351` runs `Bun.spawn(["sleep", "10"])` inside a test and signals it twice. Neither installs a spy or a mock: both spawn for real, so both hold the host process table and the scheduler as inputs.

The classifier cannot see either. `test-classification.ts:125` gives the `cli` rule five literal tokens — `Bun.spawn(["bun"`, `Bun.spawn(["node"`, `execSync(`, `execFileSync(`, `spawnSync(`. The two `Bun.spawn` forms fix the first argv element, so a wholly literal `Bun.spawn(["sleep", …])` matches nothing, and the three `child_process` forms are the synchronous ones alone, leaving async `spawn`, `exec` and `Bun.$` unreached. With no rule matching, `detectRequiredType` returns `{ type: "unit", evidence: [] }` at line 183 — the default — so `check-test-classification` agrees with the declared suffix and reports clean. Its green here says no listed substring appeared, not that the file is pure.

The hermeticity check cannot see either one either. Its walk finds reach from a test to one of the four paths in `IO_BOUNDARY_MODULES`; a test that calls `Bun.spawn` in its own body reaches no module at all. I ran it: `No unit-test IO hermeticity violations detected. [over 3206 of 3206 test files]`, both files inside that population.

The registry already holds the same hazard as a boundary, which is what makes these two an omission rather than a category nobody had considered. `_liveness-fixture-test-helpers.ts` is registered, and its entry's own note gives this ground: real `Bun.spawn` of shell processes and the genuine `/proc` scan, so "a test reaching it holds the host scheduler as an input". Both files above do exactly that inline instead of through a helper.
