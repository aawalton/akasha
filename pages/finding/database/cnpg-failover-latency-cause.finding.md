---
id: c37e31d0-e808-5903-ae61-f5ec7a33ce5e
page-type-slug: finding
title: "Cnpg failover latency cause"
domain-slug: domain/database
---

# Claim

The 07-24/25 estate latency degradation was caused by a CNPG failover that promoted the postgres primary onto node-02 at 2026-07-24T16:44:01Z (timeline 11) rather than by load, a code change, or the data path itself, though at the time this was filed the trigger for the failover was still unestablished since postgres's own logs for the window were rotated.

# Evidence

Project #16117, domain `database`, no objective written; capture off its retired `notes` attribute 2026-08-15.

Four observations confirmed the cause: `pg_control_checkpoint()` timeline_id=11 (ten prior promotions, this the eleventh); `pg_is_in_recovery()`=false (a primary now); `pg_last_wal_replay_lsn()` not null (replayed WAL — was a standby); CNPG `.status` targetPrimaryTimestamp 16:38:57.155Z, currentPrimaryTimestamp 16:44:01.755Z. The pod (postgres-cnpg-2) never restarted (uptime from 07-15, restarts 0): a promotion restarts postgres's children, not the container.

Corroborating: a process-birthday split in `pg_stat_activity` (every primary-only process — walwriter, archiver, launchers, walsenders, 175 idle backends — starts 07-24 16:44, a promotion signature); `db_query_stats` 5-min buckets 16:40/16:45 missing entirely (traffic stopped ~10 min, read as absence of interest); postgres-cnpg-3 created 07-24T22:56:47Z (CNPG rebuilding redundancy after losing an instance).

Decisive check, kept as a per-statement-overhead probe: PostgREST's per-request preamble (`set_config('search_path', ...)`), zero buffer work, flat. Daily ms/call: 07-11 .0199 through 07-23 .0178 (13 flat days), then 07-24 .0369 (2.1x), 07-25 .0716 (4.0x). A statement touching no data cannot be slowed by the data path, eliminating bloat, plans, indexes, TOAST, HOT, vacuum and cache in one line.

Eliminated: not load (07-17 ran 97.9M calls at 0.197ms vs 66.8M now at 0.823ms); not the idle baseline (07-16/17 were the busiest days at the best latency); plan change (blks/call fell 29% while time rose 4.1x); cache eviction, new index, sync replication, node resources, mining, GIN flush, held xmin, retention, event volume.

Still open at filing: why it failed over — unknown, postgres logs for the window rotated (1267 lines survive, back to 07-25 11:45); look in the CNPG operator's logs/events. Where the old primary ran is not establishable. Answered by companion finding from #16152.
