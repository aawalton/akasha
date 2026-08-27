---
id: fa5c6467-f630-5fea-a5e7-bcc4868ac99e
slug: main-pipeline-creator-wedges-on-dsl-skew
page-type-slug: finding
title: "Main pipeline creator wedges on dsl skew"
domain-slug: page-type/pipeline
---

# Claim

`main-pipeline-creator` enters a CPU-bound, allocating computation it never returns from while handling a landed sha that carries a large workflow-dsl change. Its tick never completes, its cursor never advances, and no main pipeline is created for that sha or for anything landing after it. A respawn reproduces the wedge within minutes, so it turns on the sha rather than being a transient. The tick deadline cannot preempt it, an abort signal being unable to interrupt a synchronous loop.

# Evidence

Measured 2026-08-16 between 01:39Z and 02:05Z against the live cluster, after `subscriber-lag` and `landed-no-main-pipeline` both fired.

The wedged state. `main-pipeline-creator` read `status=active`, `pendingCount` 1 exact, cursor frozen at 24955468 since 00:03:06Z. Its process in `workers/worker-supervisor-6d5f95b8bd-xc86w` was pid 310192, alive 12h42, state R with utime climbing about 11 CPU-seconds per sample and RSS 2.02 GB rising to 2.13 GB between two reads. It had written no log line in six hours while the roughly forty other subscribers ticked normally, three of them `pipeline-orchestrator.*` siblings in the same pod. SIGTERM did not touch it, itself a reading: it never reached its signal handler.

The restart, and what it proved. SIGKILL brought a respawn, `classifyChildExit` giving `respawn: true` for an unexpected exit. Pid 409740 resumed at the same cursor with nothing lost, and within two minutes it was in the same state: R, one core pegged, RSS 145 MB at boot rising through 839 MB to 1.14 GB with GC oscillation. Over three minutes of polling the cursor did not move. So the restart is not the repair. Growth is bounded: the prior process sat at 2.1 GB after 12h42.

Why nothing recovers it. `LIVENESS_WATCH` in `packages/shared/worker-supervisor/src/liveness-watchdog.ts` maps exactly one name, `persona-reward-watcher`, and its own log line calls what it does "failure-mode-B sync-wedge recovery" — the class this is. `main-pipeline-creator` is not enrolled. The `config_load_hard_timeout` escape in `main-pipeline-creator/handler-prepare.ts`, which skips a sha after two consecutive over-caps, guards a subprocess and did not fire.

ESTABLISHED SINCE, against this file's name: the skew is a co-symptom, `handler-prepare.ts:61-64` diffing the sha against the working tree rather than its parent. What holds the core is a closure `matcher.ts:109-124` rebuilds per changed file per workflow, from `select-workflows.ts:72,78,81`, restarted forever by `events-subscriber.ts:150`.
