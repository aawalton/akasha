---
id: d1f1ef0c-51bd-52d3-b832-96c2f778a2be
page-type-slug: finding
title: "Slow suite sweep two breaks"
domain-slug: domain/global
---

# Claim

The nightly slow-suite sweep (CI-excluded `.cli`/`.integration`/`.data`/`.database` suites, gating nothing on branch CI) went red on main at commit 33dda61e10 with two independent breaks, only one of which the automated alert named: a real-repo `check-phantom-deps` test timing out under shard contention, and an unattributed unhandled async rejection from live network reads in `devops-monitor`'s integration suite.

# Evidence

From project #16021 (domain `code-harness`, status `someday_maybe`, captured 2026-07-25, never given an objective). Nightly slow-suite sweep red on main, alerted to dalla 2026-07-25 09:44Z, at main 33dda61e10. Via `ops loki logs --pod slow-suite-sweep --namespace ci`: 11 shards, 556 slow suites of 3459 discovered; shards 1,2,5-11 pass, shards 3 and 4 fail; one `(fail)` line total.

Break A (shard 4, named in the alert): `check-phantom-deps.cli.test.ts` times out at the 120006ms default, no explicit timeout at line 101 — not an assertion failure. The same commit's whole 8-test file passes locally in 36.17s; shard 4 carried 59 suites, 224.17s total, so this test used over half the shard. Do not just bump a global timeout: it runs the real check across the whole monorepo and gets slower as the repo grows. Options weighed: an explicit documented timeout; its own shard (shards 1 and 2 each carried one suite — an isolation mechanism for heavy suites may exist in `select-slow-suites.ts`/`shard-suites.ts`); a cheaper assertion. Prefer reuse if found.

Break B (shard 3, not named in the alert): 460 tests, 459 pass, 1 fail, 1 error, no `(fail)` line — an unhandled async rejection outside any test. Source: `devops-monitor/snapshot.ts:119-121`'s live reads (`fetchCurrentMainSha`, `fetchSupervisorPod`, `fetchLiveWorkers`) failing on connection/cert errors. Prime suspect: `snapshot.integration.test.ts`, whose own header says the pure-live K8s/HTTP reads belong in `snapshot.smoke.test.ts`. Fix intent: no real network calls in the sweep environment; reuse existing environment-dependent-suite gating, move the reads to smoke, or harness them. Do not delete or blanket-skip the file.

Acceptance, not met: sweep fully green; for A, headroom under shard-like contention, not just isolation; for B, demonstrate the rejection is gone, not just that the suite passes. Guardrail: any suppression used to go green is Dalla-gated, routed to dalla with the reason and alternative considered.
