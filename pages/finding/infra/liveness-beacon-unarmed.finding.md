---
id: a2d6b2ad-3a45-5975-b324-f9ee88b212ff
page-type-slug: finding
title: "Liveness beacon unarmed"
domain-slug: domain/global
---

# Claim

The out-of-loop liveness beacon is armed on 1 of the fleet's 34 workers. Its own docblock calls omission "legacy behavior" and calls the recovery it enables "the only reachable recovery for a frozen event loop", so the other 33 have no way back from a synchronous event-loop block — the pid stays alive, every in-loop deadline freezes with the loop, and nothing measures how many workers are in that state.

# Evidence

`grep -rln livenessBeacon --include=*.worker.ts packages/` over `~/code`, excluding `dist`, returns one file: `packages/alanwalton/persona-reward-watcher/src/persona-reward-watcher.worker.ts:345`, `livenessBeacon: { intervalMs: 2_000 }`. `find packages -name "*.worker.ts"` excluding `dist` and `node_modules` returns 34.

The option is `livenessBeacon?: { intervalMs: number }` in `packages/shared/worker-runtime/src/run-long-running-worker-args.ts`. Its docblock states both halves of the claim in its own words: a synchronous event-loop block is "the failure-mode-B class an in-loop deadline like `tickDeadlineMs` or a subscriber's own `tickDeadlineMs` is structurally blind to, because every in-loop timer freezes together"; the supervisor watchdog "kills + respawns the wedged child — exit-for-respawn being the only reachable recovery for a frozen event loop"; and "Omit to leave the worker without an out-of-loop liveness signal (legacy behavior)."

Both halves of the mechanism are built and tested, so this is unarmed rather than unfinished: `packages/shared/worker-runtime/src/liveness-heartbeat.ts` exports `startLivenessHeartbeat` and `livenessBeaconPath`, and `packages/shared/worker-supervisor/src/liveness-watchdog.unit.test.ts` covers "the failure-mode-B repro — a child whose beacon froze while its" process stayed alive.

Nothing reports the coverage. `check-worker-shape` measures only that a worker emits a `worker.loop_duration_ms` row; grepping `livenessBeacon` across `packages/infra/checks/` returns nothing.
