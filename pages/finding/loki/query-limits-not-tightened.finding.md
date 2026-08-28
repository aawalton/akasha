---
id: 9c288e06-540c-580f-af49-4ccd61ee9731
slug: query-limits-not-tightened
page-type-slug: finding
title: "Query limits not tightened"
domain-slug: cluster-service/loki
---

# Claim

Loki's query-limit config is not tightened to bound per-query cost even though a single operator log query costs ~250MiB and was the proximate trigger of the 2026-07-25 OOM — #16247 raised the memory limit but deliberately excluded query-limit tightening, and several unbounded/enormous upstream defaults remain unset (`max_chunks_per_query` 2,000,000; `max_query_lookback`/`max_query_range` unbounded; no `querier.max_concurrent` block at all).

# Evidence

Split out of #16247 (Loki 1Gi->2Gi resize), which deliberately excluded query-limit tightening rather than guess at values. Deployed: grafana/loki:3.1.0.

Currently set (`packages/infra/loki/service/k8s/synth-configs.ts:53-63`): `max_query_series` 500 (matches upstream default, not a tightening), `max_query_parallelism` 2 (16x tighter than upstream default 32), `retention_period` 168h, `ingestion_rate_mb` 16, `ingestion_burst_size_mb` 32.

Not set, at upstream defaults: `max_chunks_per_query` (default 2,000,000, enormous against any pod budget), `max_entries_limit_per_query` (default 5,000), `max_query_length` (default 30d1h), `max_query_lookback`/`max_query_range` (default 0, unbounded), `querier.max_concurrent` (default 4, no `querier:` block at all).

Open question to resolve first: deployment uses `store: tsdb` (`synth-configs.ts:43-51`). Loki has a separate key, `tsdb_max_query_parallelism` (default 128), for TSDB schemas, not set here. If it takes precedence, the configured `max_query_parallelism: 2` is inoperative and effective parallelism is 128 — 64x looser than intended. Unverified: fetched v3.1.x docs don't state precedence. Settle by reading Loki source or a controlled experiment before tuning further.

Why #16247 excluded this, don't undo casually: `max_entries_limit_per_query` is 5,000 and aranya's killing query used `--limit 4000` — tightening below ~4-5k breaks real operator tooling. `packages/agents/devops-monitor` parses Loki for subscriber-wedge detection (`snapshot/subscriber-log-activity.ts:52-57`); truncating limits could blind wedge detection silently. Safe ceilings need a per-query cost distribution, and getting that by querying Loki is the exact hazardous act that helps kill it — measure via Prometheus or a throwaway Loki, not prod.

Prereq: #16247 landed. Related: #16241/#16245/#16246 (ingest-side reduction), #16282 (observability-stack placement).

Project #16363, someday_maybe, loki, no objective; from retired `notes`, 2026-08-15.
