---
id: f3761483-d3ad-5deb-b707-f1704b968a69
slug: reconcile-authority-prices-a-minute
page-type-slug: finding
title: "Reconcile authority prices a minute"
domain-slug: domain/code-quality
---

# Claim

The automation orchestrator's reconcile docblock prices its heartbeat backstop at 60 seconds where the wired constant is an hour, in the file that opens by calling itself the single source of truth for that reconcile. This is the third package carrying the same 60s-against-3,600,000 pair, so what stands is a template propagating rather than three local slips, and the two standing findings each read theirs as local.

# Evidence

At `~/code` on `main`, `packages/automation/orchestrator/src/reconcile.ts` opens "Shared reconcile fn for the automation orchestrator — the single source of truth for 'load both indices fresh from `public.pages` and rebuild them wholesale'". Line 16 of its numbered call-site list reads " *   2. 60s heartbeat — invoked unconditionally on every wall-clock" tick.

`packages/automation/orchestrator/src/automation-orchestrator.worker.ts:57` is `const PERIODIC_HEARTBEAT_INTERVAL_MS = 3_600_000` — one hour — and line 74 passes it as `intervalMs` inside the `heartbeat: { ... }` argument to `runLongRunningWorker`. The constant is the wired value, so the reconcile passage is prose alone. That same file agrees with the constant twice: line 19 says "Hourly heartbeat — re-invokes the same `reconcileIndices` fn", and line 41 opens "BACKSTOP TICK: hourly — the Long-Running Worker Shape default tier". The package therefore contradicts itself across two files, with the outlier sitting in the one that claims authority.

The identical pair stands in two other packages, already filed: `alanwalton-app/backstop-lag-priced-at-a-minute` for `packages/alanwalton/persona-reward-watcher`, and `alanwalton-app/entrypoint-comment-reports-the-criterion-cadence` for `packages/alanwalton/aria-story-points`. All three carry a constant spelled `PERIODIC_HEARTBEAT_INTERVAL_MS = 3_600_000` against a docblock saying 60 seconds. `code-check/worker-shape-cadence-unmeasured` records why nothing catches any of them: `check-worker-shape` measures no `intervalMs`.

A reader of `reconcile.ts` deciding how long an `automation` row Alan just enabled can go unreconciled after a missed subscriber event takes away a minute where the wired answer is an hour.
