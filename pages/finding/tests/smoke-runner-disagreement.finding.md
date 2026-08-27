---
id: 24240565-7fae-571c-9d3c-fa4ad3179432
slug: smoke-runner-disagreement
page-type-slug: finding
title: "Smoke runner disagreement"
domain-slug: domain/global
---

# Claim

Two live comments disagree about whether anything runs `*.smoke.test.ts`.

`packages/infra/tests/src/select-slow-suites.ts` excludes `smoke` from the touched-file gate as "(deploy-time)", asserting a deploy step runs it. `wake-source-tags.smoke.test.ts` says the opposite in its own header: "No automated runner executes `*.smoke.test.ts` … Invocation is manual." The first is what a reader consults when placing a suite, and it is the one claiming coverage that does not exist.

# Evidence

Read on 2026-08-07 against `~/code`; I did not record the sha.

What I read. `select-slow-suites.ts` lines 25–45, where the docblock above `SLOW_TEST_SUFFIXES` reads "`model` (never-automated) and `smoke` (deploy-time)", and the constant is `["integration", "data", "cli", "database"]`. `run-workspace-tests.sh`, where line 74 sets `CI_TEST_REGEX='\.(unit|property|component)\.test\.'` and line 42 refuses a `--test-type` outside that trio. `wake-source-tags.smoke.test.ts` in full, whose paragraph **WHAT THIS SUITE IS NOT** carries the contradicting sentence.

Where I looked for a deploy-time runner and found none. `smoke` across `packages/infra/` excluding test files: every hit is a check or a classifier naming the suffix, and `check-cli-json-contract-coupling.ts:7` calls `.smoke` one of "five CI-excluded test classes". `smoke` across `packages/infra/ci/` and `packages/shared/cli/src/ops/`: only the CI benchmark's own "smoke verdict", a report field about phase timings rather than a suite. `smoke.test` across `packages/` in `.sh`, `.json` and `.yaml`: no hits.

What I did not measure. I did not read the deploy verb end to end, so the claim is that I looked where a runner would be, not that none can exist. I did not test the same parenthetical against `model` or `browser`; `browser` is described in the same sentence as keeping a deploy-time role and may well be right. I took no census of how many smoke suites exist or when any last ran, and I did not check history for a runner since removed.

I did not repair it: which comment is wrong depends on whether smoke suites SHOULD run at deploy time, which is not mine to settle while ingesting.
