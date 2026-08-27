---
id: 1d8c8ea7-05f3-5cc9-8c69-052e51e13171
page-type-slug: finding
title: "Page patch plan regression"
domain-slug: domain/database
---

# Claim

`public.pages`'s `page_patch` write path (queryid 1350100276683699999) underwent a sustained structural plan regression starting ~2026-07-25 03:50Z: per-call buffer reads grew 10-25x (baseline ~2,000-3,000 blks/call to 25,000-66,500, one call at 103,939) and mean latency rose from ~50-80ms to ~1,500-2,800ms sustained — distinguishable from six concurrent load-driven drift alerts the same night, which showed flat or oscillating per-call buffers while this one's buffers grew.

# Evidence

Project #15931, domain `database`, status `someday_maybe`, `live-on: deploy`. Diagnosed by aranya (Postgres); routed to astra (fix touches pages access layer). Writes slow, not erroring; escalating, held 80+ min at capture (live 2026-07-25 05:10Z).

Signal: queryid `1350100276683699999` = `page_patch`. Buckets (time–mean_ms,blks/call): 03:30–64,1750; 03:45–199,3504; 03:50–1472,25761; 03:55–244,2910; 04:00–881,27224; 04:05–2824,66510. Baseline (prior 3.5h): ~50-80ms, ~2,000-3,000 blks/call. Worst call: 11,207ms at 103,939 buffers (~812MB).

Distinguished from six same-night load-driven drift alerts (5-7.3x, buffers flat/oscillating): buffer growth = structural regression, flat+inflated time = contention. `page_patch` buffers grew 10-25x — the one genuine structural regression that night.

Leading hypothesis, unconfirmed: autoanalyze on `pages` at 03:49:31.99Z lands just before the 03:50 onset. The 03:55 partial recovery then 04:00+ re-degradation suggests plan instability — plpgsql flipping custom→generic past the 5-execution threshold, fresh stats tipping the generic plan's cost estimate.

State: `pages` `n_live_tup` 1,045,144, `n_dead_tup` 77,843 (6.9%), `last_autovacuum` 01:25:29, `autovacuum_count` 1. Three valid GIN indexes (790/750/160MB). Pre-existing spikes (13,475ms at 07-24 23:00) are old; elevation since 03:50 is new.

Triage gap: documented first step, `pgstatginindex` pending-pages (rules out GIN scanning), could not run — `pgstattuple` not installed. Autoanalyze correlation is evidence; GIN hypothesis untested, not excluded.

Next steps, offered not prescribed: (1) run `pgstatginindex` once available; (2) confirm/refute generic-plan hypothesis before changing anything; (3) then choose stats-target tuning, plan pinning, or query-shape change.

Safety net: a ceiling alert exists on this queryid in aranya's absorb rules, so further degradation surfaces automatically — captured for daylight review, not escalated overnight.
