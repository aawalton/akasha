---
id: be90ad0d-cc47-5d1b-8b50-8bc7422e62d0
page-type-slug: finding
title: "Reward watcher sweep overload"
domain-slug: domain/daemon
---

# Claim

persona-reward-watcher burned 4,034 reconcile-seconds per 3,600-second hour as measured on 2026-07-25, driven by unmutexed overlapping sweeps and roughly 174 sequential PostgREST round-trips per sweep over 42 personas, a defect distinct from and deliberately not touched by #16240's timer-cadence fix.

# Evidence

Project #16241, domain `daemon`, tags `workers performance persona-reward-watcher postgrest n-plus-one author:worker-16240`, owner `aranya`, status `someday_maybe`.

Surfaced during #16240 (timer cadence). #16240 fixed the timer half (60s heartbeat -> ladder tier); this row is what #16240 deliberately did not touch — per-sweep cost and event-path cadence.

MEASURED 2026-07-25, pod worker-supervisor-568bc94889-z426r, worker.loop_duration_ms last hour: subscriber phase 267 ticks, p50 10,399ms, p95 21,635ms = 3,352 sweep-seconds/hr; heartbeat phase 49 ticks, p50 10,486ms, p95 27,863ms = 682 sweep-seconds/hr. Total 4,034 reconcile-seconds per 3,600s hour.

THREE DEFECTS: (1) Sweeps overlap — a correctness concern, worker inside a sweep >100% of wall-clock time. run-long-running-worker.ts routes only boot/heartbeat through the reconcile mutex; `reconcile: () => reconcileAllPersonas(ac.signal)` is unmutexed, so two concurrent full-state reconciles run over the same 42 personas. (2) ~174 sequential round-trips per sweep (N+1): loadPersonaContexts (2 list + 42 sequential readPersonaDayPoints); per-persona x42 of repointCover+getRewardNotifications+getWallpaperNotifications=126; reconcileStampStaleness=3. Verified against pg_stat_statements: predicted 13,272 calls/hr on relationshipLevel, observed 13,302 (0.2%). Postgres exec only ~6 CPU-s/hr — cost is client-side (HTTPS/JSON/Zod) at ~15 round-trips/sec. (3) Subscriber over-fires: 756 relationship-progress events/hr produce 267 full sweeps, ~2.8 events/10.4s sweep — should be coalesced/debounced.

LEVERAGE ESTIMATE: batching per-persona reads into IN(...) queries: ~174 round-trips -> ~8 (~20x). Coalescing the subscriber: 267 sweeps/hr toward heartbeat tier (~4x).

RULED OUT: the 2s livenessBeacon — 5.42us/fire, 4-5 orders below observed cost, 15x margin against liveness-watchdog.ts:50's 30,000ms budget. Leave at 2_000. Full evidence in #16240's notes.
