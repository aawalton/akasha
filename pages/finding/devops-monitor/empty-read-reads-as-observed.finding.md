---
id: 21a6d208-fa78-50b9-86f7-7e1bd3587ff8
slug: empty-read-reads-as-observed
page-type-slug: finding
title: "Empty read reads as observed"
domain-slug: domain/global
---

# Claim

The devops monitor's snapshot readers split on a one-line convention. One returns `null` where it finds nothing; every other returns `[]`. The guard that separates "I could not see" from "I saw nothing wrong" tests only for `null`. So in one tick, over one emptiness, one class honestly reported `unobserved` and four reported `clear`.

The convention is invisible at every call site, and it decides whether an alarm can tell absence from health.

# Evidence

Measured 2026-08-20, by running the readers and the classifiers against the live database rather than reading them.

`requiring()` at `tools/lib/devops-monitor/wedges/observed.ts:51` rejects a value only where it is `null` or `undefined`. An empty array is a present value, so it passes as observed and the body decides on it.

`fetchMergeQueueSlice` returns `null` for an empty read, at `tools/lib/devops-monitor/snapshot/db-slices-merge-queue.ts:41`. `fetchMainPipelines`, `fetchCoveredMainShas`, `fetchDispatchingBacklog`, `fetchRecentBatches` and `fetchRecentlyEjectedEntries` in that file return `[]`, several from their catch blocks too, so a failed read and an empty one are indistinguishable downstream.

With six page-type rows gone, the readers answered `mergeQueue: null` and `mainPipelines`, `coveredMainShas`, `dispatchingBacklog` and `recentBatches` all `[]`. The classifiers then answered `dispatch-stall: unobserved`, and `main-pipeline-overrun`, `landed-no-main-pipeline`, `dispatcher-liveness` and `supersede-cycle` all `clear`. The only thing separating the honest reading from the four wrong ones is which empty value its reader chose.

This is not confined to pages. `fetchChildExitCounts` at `tools/lib/devops-monitor/snapshot/child-exit-rate.ts:14` reads `public.metrics`, returning `rows.map(...)` on zero rows and `null` only on a throw. The worker supervisor was scaled down, `worker_supervisor.child_exit` stopped at 12:39:00 UTC, and at 12:50:03 UTC the monitor recorded `alert.condition.cleared` for `child-crashloop`. `alanwalton-daily-tracking` had been exiting unexpectedly 120 times an hour and did not recover; the process reporting it was turned off. That row stands on `public.events`.

`tools/lib/devops-monitor/wedges/seat-derivation-coverage.ts:12` treats an empty list as unobserved rather than healthy, and is the model to copy.

Not measured: whether readers outside this directory carry the same split.
