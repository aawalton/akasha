---
id: 08fb77d2-c219-576c-9a4b-7e94153ce906
slug: high-connections-cannot-mark-onset
page-type-slug: finding
title: "High connections cannot mark onset"
domain-slug: domain/global
---

# Claim

`PostgresHighConnections` cannot mark the onset of connection exhaustion, because it is already firing long before one arrives. It compares each `pg_stat_activity_count` bucket against a fixed 250 rather than the sum against `pg_settings_max_connections`, which reads 500. It fired continuously for twenty hours to 2026-08-15 11:39Z, spanning the 11:04Z exhaustion in which Postgres refused at least 400 connections, and it cleared 35 minutes after them.

# Evidence

Measured 2026-08-15 14:40Z, read-only, from Prometheus and the Postgres logs in Loki.

THE EXHAUSTION. Postgres logged `remaining connection slots are reserved for roles with the SUPERUSER attribute` 400 times in two minutes — 333 at 11:04Z and 67 at 11:05Z, 399 of them for `service_role` and one for `agent_adhoc`. 400 was the query limit, so that is a floor rather than the count.

THE ALERT ACROSS IT. `ALERTS{alertname="PostgresHighConnections",alertstate="firing"}` holds one unbroken episode over 48 hours: 2026-08-14 15:14Z to 2026-08-15 11:39Z, on the `service_role` / `idle` bucket. So it was firing for nearly twenty hours before the refusals, was still firing through them, and resolved 35 minutes after them. Its state never changed at the moment that mattered, in either direction.

WHY IT CLEARED WHEN IT DID. The bucket, not the server, fell. Ten-minute samples: 11:20Z bucket 447, total 500; 11:30Z bucket 445, total 499; 11:40Z bucket 447, total 501; 11:50Z bucket 186, total 263. The threshold is on the bucket, so a mass disconnect cleared the alert while the server had just been at its cap.

WHAT IT WOULD TAKE TO BE RIGHT. `pg_settings_max_connections` is scraped and reads 500. The sum across buckets is what a cap constrains, and `sum(pg_stat_activity_count)` held between 330 and 502 for the whole 24 hours to the reading — 486 at 05:30Z and 06:30Z, 502 at 11:30Z and 12:30Z. A rule on the sum against that scraped cap would have separated the ordinary band from the breach; the one that stands did not.

NOT ESTABLISHED. Which caller holds the `service_role` connections, though they are `idle` rather than active and the count tracks the events poll population. Whether the 11:50Z collapse was a pool recycling, a restart, or eviction. Whether a fraction of the cap is the right threshold or the alert should watch refusals directly, the server logging those exactly.
