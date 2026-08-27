---
id: 0de90c0f-7651-5b30-a583-01977b6ebf88
slug: cli-exit-code-expectation-outlived-its-siblings
page-type-slug: finding
title: "CLI exit code expectation outlived its siblings"
domain-slug: domain/global
---

# Claim

`packages/infra/loki/cli/src/loki/logs.cli.test.ts` fails on a clean main with two cases, both asserting `exit 1` where the verb now exits 70 for a missing-environment error. Nothing gates it: `cli` is a member of `SLOW_TEST_SUFFIXES`, and `select-tests.unit.test.ts` states outright that the class "never gates branch CI", so this red is a designed blind spot rather than a lane accident.

# Evidence

MEASURED HERE RATHER THAN TAKEN ON REPORT. `bun test packages/infra/loki/cli/src/loki/logs.cli.test.ts` on `~/code`: 15 tests, 13 pass, 2 fail. Both failures are `expect(result.exitCode).toBe(1)` receiving 70 — line 87, missing `PIPELINE_SA_TOKEN`, and line 93, missing `K8S_API_BASE`. The stderr assertions beside them still pass, so only the exit code moved.

WHY IT IS NOT A LANE ACCIDENT. `packages/infra/tests/src/select-slow-suites.ts:39` declares `SLOW_TEST_SUFFIXES = ["integration", "data", "cli", "database"]`, and `packages/infra/tests/src/select-tests.unit.test.ts:19` says of a suite reclassified as `cli` that the class "never gates branch CI". So no branch pipeline runs this file, and its red is invisible to every verdict a seat reads before landing.

IT SURVIVED A REPAIR SWEEP THAT REACHED ITS SIBLINGS. A 2026-07-30 sweep recorded five suites red on one exit-code convention change: `agent/spawn`, `project/claim`, `project/start`, `project/integrate`, `loki/logs`. Re-run here on the arg-parsing cases, the first four are green — spawn 7 pass, claim 4 pass, start 13 pass, integrate 3 pass, 0 fail across all four. Only `loki/logs` still carries the old expectation. Whoever repaired the four had no instrument that would have named the fifth.

WHAT WAS NOT MEASURED. How many other `cli`-class suites carry the same stale expectation — the 2026-07-30 sweep covered 165 of 259 and stopped partway, and nothing has re-measured the remainder. Whether the nightly slow-suite sweep reports this file at all, or reports it inside a red already dominated by other causes.
