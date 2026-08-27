---
id: e6955819-2f02-5437-bcbe-7f3478042d74
page-type-slug: finding
title: "Frozen cursor below prune floor deadlock"
domain-slug: domain/global
---

# Claim

Eight events-system subscribers (points-tracking) had cursor_inserted_at frozen since late June, below the retention-pruned floor, an unrecoverable deadlock invisible to monitoring (status idle, error null) that persisted about a month and cost 927x normal query time — measured at 13-21% of the entire estate's DB execution time, manually remediated 2026-07-25 12:22Z.

# Evidence

Project #16150, domain events-system, no objective; capture off retired `notes` attribute 2026-08-15. Measured/remediated 07-25 12:22Z; filed for structural prevention, not the incident.

Eight subscribers (ceri/elaine/eppie-song/erin-chess x3/nimue/zadi -points) had cursor_inserted_at frozen late June, cursor_seq 6.8-11.4M below hypertable prune floor min(seq)=17,282,024. status=idle, error null. cursor_inserted_at gates TimescaleDB chunk pruning; frozen floor forced full-hypertable scans every poll. EXPLAIN before/after floor advance: 2297.8ms -> 2.48ms (927x); healthy poll ~0.06ms, so ~38000x normal, x8 running.

Deadlock: advancing the floor requires consuming a matching row; all such rows already pruned — unrecoverable, not transient.

Defect 1: advance-to-tail can't fix it — derives tail from the subscriber's filtered MAX(seq), NULL here, so cursor_seq stays unchanged (nimue-points 6,833,814->6,833,814 vs healthy ~20.2M); appeared to help only via a side effect (unconditional cursor_inserted_at=now()).

Defect 2: no detection — a lag-wedge class exists (fired for pages-fs-projector 12:40Z) but not these eight, since seqLag is computed against a tail they can never reach.

Scope: (a) fall back to global MAX(seq) when filtered MAX is NULL; (b) detect frozen-floor state (cursor_inserted_at older than oldest chunk); (c) consider flooring cursor_inserted_at at the retention horizon on write.

Precedent: `packages/shared/worker-runtime/CLAUDE.md` names this class (150k mined-item creations/16min); this instance measured 287,436 in the 07-24 12:00 window — docs alone did not prevent it.

Retraction: an earlier "13.4 million events behind" report was wrong — max(seq)-cursor_seq is arithmetic over ~2.97M actual rows, not a row count.

Upgrade 13:15Z: a discriminating test (athena designed; astra+filer ran independently, agreed) on db_query_stats queryid 2544743226929606308 found this query cost 13-21% of the estate's DB execution time, honest bound ~23%.
