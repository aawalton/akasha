---
id: 10dd0f85-7a26-5db8-af3d-08b59de9bb2f
page-type-slug: finding
title: "Subscriber stalls after prep invisible"
domain-slug: domain/main-pipeline
---

# Claim

Project #17431 (domain `main-pipeline`), found while landing #17353, observed that `main-pipeline-creator`'s subscriber tick for landed SHA `65cf5456` completes its ~180s prep and then stalls with zero CPU, zero query and zero lock — appearing healthy to `ops worker heartbeats` (a pod-level check) for 16 hours while `event_subscribers.updated_at` sat frozen, and reproducible independently of a separate workflow-DSL-skew refusal that can wedge the main lane on its own.

# Evidence

Project #17431, domain `main-pipeline`. Landing #17353: main reached `65cf5456`; no pipeline minted. `waitForMainDeploy` polled 20 min, UNKNOWN; `[7/7]` migrations skipped; row never passed `deployment`.

BROKEN: `main-pipeline-creator` tick doesn't complete: runs `prepareMainPipelineFromEvent` prep (~180s git + SHA-pinned config/graph load), then stalls — no cursor advance, no `ticked` line, no `status='error'`. Cursor `21826672`; `main_pipeline.requested` event for landed SHA at `21882274`.

MEASURED: `readEventsBatch` returns it in 37ms, 11 shared buffers — not a read problem. `pg_blocking_pids` empty, no long txn — not a lock. Process burns ~263s user time (3.5-min heartbeat-reconcile gap, holds `ReconcileMutex`), then ~0.2% state S — not CPU. Sync + restart at landed SHA cleared skew; stall reproduced fresh — not staleness.

Likely: txn-2 commit (`commitMainPipelineCreation`) waits on a connection never granted. Earlier, same fault: `failed to emit worker.loop_duration_ms for main-pipeline-creator/heartbeat: Query read timeout`; `heartbeat reconcile failed`. SIGKILLed: "graceful-shutdown drain exceeded 25000ms after abort; forcing process exit — event loop held open".

WHY UNSEEN: `ops worker heartbeats` reported OK (`last_seen` secs old) while subscriber loop dead 16h — reads pod-level `max(hb.inserted_at)`, not `event_subscribers.updated_at`, frozen `2026-07-31T22:40:07`. `list-error` also blind: row never reaches `status='error'`. Only `list-lag` showed it: `pending_count=1`, growing `pending_age_seconds`.

DEADLOCK: refused to mint, logging `drift_detected workflow_dsl_skew afterSha=65cf5456 files=...workflow-dsl/src/cli.ts,...ci-identifiers.ts`. #17353's `cf7670c9` changed the DSL; worker ran `spawnedSha=22c5d5a8` (2026-07-30); all 35 pod workers stale. Circular: refresh runs inside the pipeline it refuses to mint — any land touching workflow-dsl wedges main until an operator acts.

MANUAL, not a fix: `POST /repo/sync {"sha":"65cf5456..."}` (`22c5d5a8`→`65cf5456`), `POST /workers/main-pipeline-creator/restart`. Cleared skew; not stall.
