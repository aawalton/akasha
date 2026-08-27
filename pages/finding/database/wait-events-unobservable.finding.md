---
id: fb2d134d-b8de-5dca-b178-9ef182b8ac1d
slug: wait-events-unobservable
page-type-slug: finding
title: "Wait events unobservable"
domain-slug: domain/database
---

# Claim

The estate has no observable instrument for Postgres-internal wait time (no pg_wait_sampling, no Prometheus wait-event metrics, pg_stat_statements.track_planning off), so the class of explanation fitting #16058 -- same cache-resident work, ample CPU headroom, but multiples of wall-clock time -- cannot currently be measured.

# Evidence

Gap measured by dalla, 2026-07-25. pg_wait_sampling: no (8 extensions: btree_gin, pg_cron, pg_jsonschema, pg_net, pg_stat_statements, pg_trgm, plpgsql, timescaledb). Prometheus wait-event metrics: none (61 name matches for wait|lock, zero from postgres). track_planning: off. Statements with plans > 0: 0 of 2932 (sum(total_plan_time) = 0.0 ms).

Why load-bearing: three agents eliminated observable mechanisms on #16058 -- plan regression, workload shape, cache eviction (read/call 0.00 in 8/9 windows), node-02 CPU (peak 5m never above 46.5% on 12 cores), runqueue wait (fails both directions), mining (exclusion test). Every remaining hypothesis is inferred from what's left after eliminating the observable.

Related gap: track_planning off makes planning cost invisible estate-wide -- dalla's CI dispatcher query plans in 1,041 buffers vs 36 for execution, ~10k/hr, never measured. Not #16058's mechanism, same missing-instrument class.

Scope proposed: install/enable a wait-event sampler on CNPG, export it. Ground layer: aranya; planning-cost half: dalla's, once track_planning is on. Caution: not free at ~10k/hr, measure overhead; live-primary change, settle-gate applies.

Follow-up, 2026-07-25T12:06:18.138Z: converges with a correction sent to astra 20 min earlier -- two independent instruments find the same bimodal shape (~5.3k/~10k bpc_p50: 07-23 7023, 07-24 9144, 07-25 5265, 5271). Diagnosis: the latency series moved to 3h grain while the work series stayed at 18d -- coarse normalizer, fine numerator, a defect general to ratios from series at different grains. Normalized spread (54.0/9.9=5.45x) equals raw (295.7/54.0=5.48x) -- confound removed without enlarging the phenomenon. Buffer-hits is a cost with a work denominator, not throughput.

Not carried forward: CPU-util/runqueue-wait each failing both directions shows only that neither is the mechanism, not "at least two mechanisms" (note cut mid-argument). Project #16104, someday_maybe, deploy, domain database.
