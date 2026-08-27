---
id: 532186ad-1b58-5c29-8257-f7b8626aee42
page-type-slug: finding
title: "CI pods lack DB primary antiaffinity"
domain-slug: domain/node
---

# Claim

CI step pods carry no scheduling constraint keeping them off the node hosting the Postgres primary, and any fix must key on the CNPG primary pod label (`cnpg.io/instanceRole=primary`) rather than a node name, since the primary is a role that moves unattended (it moved twice during the investigation itself: to node-02 at 16:44Z on 07-24, back to node-03 at 12:34Z on 07-25 by Alan's instruction).

# Evidence

Project #16149, domain `node`, no objective; capture off its `notes` attribute 2026-08-15. Measured 07-25 during the #16058 latency investigation.

CI step pods carry no nodeSelector, no affinity, only default not-ready/unreachable tolerations. Live at 12:35Z, node-02 (hosting postgres-cnpg-2, primary since the 07-24 16:44:01Z failover): postgres-cnpg-2 2649m, a CI step 1361m (second-largest consumer on the node), node-02 total 4451m/37%. CI pod distribution: node-05 x10, node-06 x3, node-04 x2, node-02 x2, node-01 x2. CI lands on the primary's node routinely.

Why it matters: a sweep spins up 12 shards at once, each holding a core for minutes, then exits — bursty interference at ~1-minute scale. Per-bucket CV data (athena) localized the latency tail to exactly that band (CV 0.14 -> 0.72 across the 07-24 step); an earlier co-tenancy check on 5-minute CPU utilization missed it.

Hardware context (byte-identical work, shared hit=47, zero temp, work_mem=512MB): node-03 (old primary's node) median 365.25ms, CV 0.012; node-02 (new primary) median 753.76ms, CV 0.175; 2.06x slower, disjoint. Confound: node-02's loadavg includes the primary's 2649m, so 2.06x conflates CPU generation, co-tenancy and serving load.

Scope: add scheduling constraints so CI step pods cannot land on the DB primary's node; prefer anti-affinity against the CNPG primary pod label over a hard-coded node exclusion, so it survives a future failover.

Not in scope: whether the primary should be on node-02 (needs Alan, tracked on #16154); why the 07-24 failover happened (answered by #16152).

Addendum 12:50Z: a 12:34Z switchover (Alan) moved the primary to postgres-cnpg-3/node-03; node-02 now holds the replica. All measurements above were taken on node-02, so a node-02-shaped fix (nodeSelector/taint naming node-02) is now harmful — it would push CI onto node-03, where the primary now lives. Principle (athena): a constraint keyed to where a moving thing currently is is wrong from the moment written.
