---
id: 59d69301-3301-51d2-9290-16993078addc
slug: querytexecutor-tick-untimed
page-type-slug: finding
title: "A daemon composed with a QueryExecutor emits no boot or heartbeat duration"
domain-slug: domain/daemon
---

# Claim

`run-long-running-worker.ts` and `subscriber-tick-metric.ts` disagree about how to instrument a `QueryExecutor`. The subscriber falls back to `{ client: pool }` and still measures; the worker sets `measurePool` to undefined, and `instrumentTick` then returns the body unmeasured. So a daemon composed through `runLongRunningWorker` with a `QueryExecutor` rather than a `Pool` emits no boot and no heartbeat duration, while a subscriber tick over that same executor emits one. One of the two is wrong.

# Evidence

Found on 2026-08-20 by a run converting `Daemon Composition`, and confirmed afterwards by reading both files rather than taking the report for it. In `packages/shared/worker-runtime/src/subscriber-tick-metric.ts`, lines 12 and 13 choose `{ pool }` where `"connect" in pool` holds and `{ client: pool }` where it does not, so either shape is measured. In `packages/shared/worker-runtime/src/run-long-running-worker.ts`, lines 42 and 43 set `measurePool` to `args.pool` under the same test and to `undefined` otherwise, and line 49 reads `if (measurePool === undefined) return await body()`. `instrumentTick` wraps the boot at line 106 and the heartbeat at line 143, and the signature at line 8 of the args type accepts `Pool | QueryExecutor`, so the untimed path is reachable by a caller doing nothing wrong. The same run also found that the standing description of `Daemon Composition` asserted "Composing does not emit it on its own", which this instrumentation contradicts; that sentence did not survive the conversion.
