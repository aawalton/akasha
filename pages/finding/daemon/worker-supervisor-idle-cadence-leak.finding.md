---
id: 3200ba0e-3ef8-5b08-a6bf-0b4d29835eb3
slug: worker-supervisor-idle-cadence-leak
page-type-slug: finding
title: "Worker supervisor idle cadence leak"
domain-slug: domain/daemon
---

# Claim

The worker-supervisor pod climbed from ~3.51GiB to a 12Gi OOM kill over 51 uninterrupted hours (2026-07-18T08:30Z to 2026-07-20T11:36Z) with no deploy-driven reset in that window, continuing through a fully idle 7-hour CI stretch with zero pipelines created — ruling out a dispatch-volume-driven mechanism as sole cause and pointing to an idle-cadence leak or a slower residual leak too gradual for the #15625 fix's observation window to catch; the source has not been identified.

# Evidence

Project #15764 (domain: daemon), status someday_maybe, live-on: deploy. No `# Objective`; these notes are the observation.

SIGNAL (ground-layer, relayed live, 2026-07-20 ~11:4xZ). Pod workers/worker-supervisor-568bc94889-847j5 (created 07-15T12:26Z), container worker-supervisor-main OOMKilled 07-20T11:36:26Z at 12Gi limit, restartCount 2 (restart #1 was the already-closed #15625 OOM on 07-17T05:31Z). Fresh container healthy ~3.16GiB. Read-only inspection.

CONTEXT: #15273 (leak #1, coordinator per-batch discovery cache-busting import) fixed+closed 07-15. #15625 (leak #2, same primitive via graph-BUILD) fixed+deployed+verified-flat 07-17T08:12Z, closed with rider "a reading materially above ~200MB resting reopens the row." #15625 also DEFERRED main-pipeline-creator loadGraph fallback (packages/infra/ci/orchestrator/src/main-pipeline-creator/graph-build-memo.ts, worker.ts:193-207) as a follow-on row — this project confirmed that row was never created; the gap sat open since 07-17.

INVESTIGATION (read-only): (1) #15625's fix is UNREVERTED — zero commits since 07-17 touch the relevant files. (2) Prometheus working_set: two deploy-driven resets 07-17/07-18, then an uninterrupted climb from 07-18T08:30Z (3.51GiB) to ~12GiB at kill — 51 straight hours, no reset; ~166MiB/h tapering to ~90MiB/h. (3) FALSIFICATION: public.pages shows 07-19T01:00-08:00Z fully idle CI, yet working_set still climbed +0.91GiB in that window; weekend pipeline rate dropped sharply while climb slope only modestly reduced — rules out a purely dispatch-volume-driven mechanism as sole driver. Points to an IDLE-CADENCE leak among the pod's ~40 always-resident workers, or a slower residual leak too gradual for #15625's ~2h window to catch.

OPEN QUESTIONS: per-worker RSS ledger across a multi-day idle-inclusive window to attribute by elimination; check periodic-tick workers for the same cache-busting-import class; the deferred MPC-fallback fix is still worth doing regardless.
