---
id: 48be4671-f457-588c-85b8-2bf8c215e01c
slug: spawn-reports-success-on-dead-boot
page-type-slug: finding
title: "Spawn reports success on dead boot"
domain-slug: barred-meaning/agent-launch
---

# Claim

`ops seat start` reports success for a seat whose supervisor died at boot, so a dispatcher is told the work is in flight while nothing is running and the row looks correctly dispatched.

# Evidence

Measured on 2026-08-10. `ops seat start --seq 18436 --task build-singleton-deploy` printed an agent id, the composed seat name and `spawned`, and exited 0. The wrapper had already exited 1, recorded in that seat's own `spawn-state.json` as `wrapperExit` at 315ms after `startedAt`. No systemd scope was ever started for it, `ops seat logs` answered "no session data available", and `ops seat exits` reported `recorded=0` — a death no exit site observed leaves no record.

The verb's own help declares exit code 3 for "supervisor failed to boot", so the case is known and named. It did not fire here: the launch is detached, and the verb returns before the wrapper's exit is observable.

What the dispatcher is left holding: an agent row bound to the right name, a project sitting at `awaiting_worker_seat`, and a report saying the seat is running. Nineteen seats died this way in one hour on this host and nothing surfaced it — the loss was found only because a lead went looking for one seat of her own that had gone quiet, and the same lead had already reported to Alan that the work was in flight.

The evidence needed to answer honestly is written before the verb's caller acts on it. `spawn-state.json` carries `wrapperExit`, `killedByReaperAt` and `exitedCleanlyAt` beside the pid, and reading it back after a short wait is what separates a booted seat from a dead one. Nothing on the dispatch path does that read.
