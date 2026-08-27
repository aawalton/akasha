---
id: 7dec629b-f6c4-5c13-90fd-b354fc3accc4
page-type-slug: finding
title: "Worker safety knobs default off"
domain-slug: domain/global
---

# Claim

Every wedge-bounding option on `runLongRunningWorker` defaults to off, and each docblock names the off state "legacy behavior" rather than a choice. Across the fleet's 34 workers, `tickDeadlineMs` is set on 21, `startupDeadlineMs` on 1, `livenessBeacon` on 1. So an unbounded tick, an unbounded startup and an undetectable frozen loop are each the default a new worker gets by writing nothing, and no instrument reports which workers are in that state.

# Evidence

Counted over `~/code` with `grep -rln <key> --include=*.worker.ts packages/`, excluding `dist`, against the 34 files `find packages -name "*.worker.ts"` returns excluding `dist` and `node_modules`:

- `tickDeadlineMs` — 21 of 34
- `startupDeadlineMs` — 1 of 34
- `livenessBeacon` — 1 of 34

All three are optional keys on `RunLongRunningWorkerArgs` in `packages/shared/worker-runtime/src/run-long-running-worker-args.ts`, and each docblock ends the same way in the file's own words: "When omitted, ticks remain unbounded (legacy behavior)"; "When omitted, startup remains unbounded (legacy behavior)"; "Omit to leave the worker without an out-of-loop liveness signal (legacy behavior)."

Each also names what the off state costs, at the same site. `startupDeadlineMs`: a DB or LISTEN call on a half-open socket "wedges there with no client-side bound — the server-side `statement_timeout` cannot traverse a dead socket, so the boot hangs until the kernel abandons the socket (~2h — the #14923 pages-fs-projector wedge)". `livenessBeacon`: the supervisor watchdog's kill-and-respawn is "the only reachable recovery for a frozen event loop".

Nothing measures the adoption. `check-worker-shape` in `packages/infra/checks/src/checks/` measures only that a worker emits a `worker.loop_duration_ms` row; grepping all three key names across `packages/infra/checks/` returns one hit, the word `intervalMs` inside `check-worker-shape.ts`'s violation message.
