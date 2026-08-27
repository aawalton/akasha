---
id: 7ae5e537-7abe-55b7-ba81-b2927167b7f2
page-type-slug: finding
title: "Tick shape split from daemon"
domain-slug: domain/global
---

# Claim

`events-worker` sits under `events-system` and not under `daemon`, so it inherits nothing `daemon` states. Both are loops a service runs on a tick, and the split means a rule written for one reaches only half the processes it describes.

# Evidence

`domains/events-worker.md` declares `domain-parents: events-system` and defines an events worker as "a process that runs one or more subscribers". `domains/daemon.md` declares `domain-parents: service, resource-utilization` and defines a daemon as "a loop a service runs on a tick".

Nothing connects them. An events worker ticks — `packages/shared/worker-runtime/src/subscriber-tick-metric.ts` emits one `worker.loop_duration_ms` row per tick, and `events-types.ts:238` reads "When set, each tick emits a `worker.loop_duration_ms` row". So the tick shape `daemon` names is what an events worker does, and `daemon`'s Design line "A daemon runs one tick at a time" holds of it.

Found while placing the `Daemon Composition` rule, landed on `domains/daemon.md` at `ea9a9ac546`. That rule binds every daemon. The worker it exempts by allowlist — `packages/infra/ci/orchestrator/src/ci-pod-reaper-loop.worker.ts` — runs no subscribers and is a daemon only; the events workers run subscribers and are not reached by the rule at all, though the mandate was written for them as much as for the reaper.

Whether the repair is a second parent on `events-worker`, a move, or a rule stated in both places is not settled here.
