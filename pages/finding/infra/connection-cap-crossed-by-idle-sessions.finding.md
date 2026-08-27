---
id: 8a044796-eba6-50b6-b35e-a0c9966c809b
page-type-slug: finding
title: "Connection cap crossed by idle sessions"
domain-slug: domain/global
---

# Claim

Postgres crossed its 500-connection cap once, peaking at 502 on 2026-08-15. Across that window peak idle connections were 498 against peak active of 24, so the server was never running more than 24 concurrent queries. pgbouncer is deployed but holds no application pool, so every one of those connections went direct. `PostgresHighConnections` fired throughout and spoke correctly.

# Evidence

Measured 2026-08-20 against the live Prometheus in pod `prometheus/prometheus-7b9fc7c557-vf2q4`.

`pg_settings_max_connections` on `postgres-cnpg-rw` reads 500. Daily maxima from `max_over_time(sum(pg_stat_activity_count)[24h:5m])`, by date: 08-14 326, 08-15 502, 08-16 335, 08-17 228, 08-18 275, 08-19 243, 08-20 163.

One episode, 2026-08-14 09:00 to 08-15 05:00 UTC, crossing the cap at 502. The same `max_over_time` split by `state` across the window gives idle 498 and active 24.

`count_over_time(ALERTS{alertname="PostgresHighConnections"}[7d])` returns 2450 firing samples; at the 30s evaluation interval that is about 20.4 hours, spanning the episode. The rule reads `inactive` now.

Every `pgbouncer_*` series carries only the internal admin database `pgbouncer` — 0 server-active, 1 client-active, `max_client_conn` 200. No application database has a pool.

Current consumers by `usename`: electric 21, supabase_realtime_admin 16, authenticator 13, service_role 6, postgres 4. Total 61, of which 58 are idle and 3 active.

Today's reading is not representative. Group A — the worker-supervisor deployment and seven CI and sync CronJobs — is deliberately scaled down for the migration window, which is why 08-20 reads 163 and the present total is 61. The normal-operation range is 08-16 to 08-19: 228 to 335, or 46 to 67 percent of cap.

This records an episode that happened rather than a part sitting near its bound. A part standing just under a bound is the mechanism working. This crossed the limit once, and the composition — idle sessions accumulating while concurrency held at 24 — points at connection lifecycle rather than load.
