---
id: 45d3b87a-8adc-5667-b079-d0b901a12877
slug: calendar-sync-run-tracking-unreconciled
page-type-slug: finding
title: "Calendar sync run tracking unreconciled"
domain-slug: domain/alanwalton-app
---

# Claim

`@alanwalton/calendar-sync` carries its own `trackSyncRun` instead of `@shared/utils-sync/track-sync-run`, and the shared one has since grown two crash-recovery mechanisms the local copy does not have. A run killed by the CronJob's 900-second deadline or by its 512Mi memory limit leaves its `sync-run` row `running` permanently, and `restartPolicy: OnFailure` mints a fresh one on each retry.

# Evidence

Two implementations stand. `packages/shared/utils/sync/src/track-sync-run.ts` is exported as `./track-sync-run` from `@shared/utils-sync`, and seven collections consumers import it — wandering-inn, great-courses, open-scripture, books, royal-road twice, and music. `packages/alanwalton/calendar/sync/src/sync/track-sync-run.ts` defines its own at line 14, which `src/sync/sync-all.ts:5` imports relatively.

The shared one recovers from a killed process two ways. A sweep on entry marks any row for this `source` still `running` past `STALE_RUN_THRESHOLD_MS` (line 16, seven hours) as `failed`, catching a SIGKILL or an OOM. And `process.once("SIGTERM", …)` / `process.once("SIGINT", …)` at lines 107-108 record a terminal `failed` inside the grace-period window.

The local copy has neither. It creates a `running` row, runs the sync in a `try`/`catch`, and patches the row on the way out. `rg -n "SIGTERM|SIGINT|process\.on"` over `packages/alanwalton/calendar/sync/` exits 1, and there is no sweep of prior rows.

The kill paths are in the package's own manifest. `deploy/k8s/synth.ts` sets `activeDeadlineSeconds: 900`, so Kubernetes sends SIGTERM at fifteen minutes and SIGKILLs after the grace period, and it sets `resources.limits.memory` to `512Mi` equal to the request, so an OOM kill needs no burst headroom. `restartPolicy: "OnFailure"` brings the pod back and creates another `running` row, one per attempt. `concurrencyPolicy: "Forbid"` stops two schedules overlapping and does nothing about rows a previous one left.

The signatures differ, so this is a migration rather than an import swap: the shared one is `trackSyncRun(source, syncFn, staleAfterMs?)`, builds its own client through `createServiceRoleClient()` and returns `Promise<void>`; the local one is `trackSyncRun(sb, source, syncFn)`, takes a `PageAccessClient` and returns the `SyncResult` that `sync-all.ts:51` uses.

Measured in `~/code` on `main`, 2026-08-08. `~/memory/findings/` searched first for `trackSyncRun|track-sync-run|utils-sync|calendar-sync`; exit 1.
