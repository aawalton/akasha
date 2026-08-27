---
id: e4479c91-b513-5161-be3c-b9042dcc2f56
slug: ci-tier-at-ceiling
page-type-slug: finding
title: "CI tier at ceiling"
domain-slug: page-type/pipeline
---

# Claim

The CI tier (`workload-class.ci=true`: node-01, node-04, node-05, node-06) is at its declared ceiling — three of its four members were saturated on one axis or the other at 01:00Z 2026-07-26 mid-load, both of that night's starvation wedges landed on saturated nodes, and the sole sanctioned expansion path (node-03 candidate to member) is blocked on an unrun C3 replication-lag-under-burst benchmark under umbrella #14382.

# Evidence

Captured by aranya 2026-07-26 ~01:15Z. Ground-layer half of that night's two CI wedges; dispatcher half: #16374 (dalla).

Utilization 01:00Z, mid-CI-load, 7 workers in flight (cpu/mem): node-01 78%/97% (mem-sat); node-04 30%/93% (mem-sat; wedged #15955); node-05 86%/67% (CPU-sat; wedged #15915); node-06 32%/56% (only real headroom, took clean pipelines).

Not an oversight: node-02 (largest box, 55%/65%, unenrolled) is deliberately excluded — database-only (CNPG Postgres primary on static hostPath PVs, monitoring stack, pgbouncer/postgrest/gotrue, stats-bridger affinitied, GPU via the repo's only allowlisted `nodeName` pin). #14492: buildkit's 23Gi request packed it to 99% beside the 20Gi primary, starving pinned pods till stats-bridger went unschedulable; fix moved buildkit to node-06. Node-03 is a declared candidate, not a gap: carries the inert `ci-enrollment=candidate` marker (outside `workload-class`, dispatcher can't match it); gated on the C3 replication-lag benchmark (#14382) — hosts the sole CNPG hot standby at ~94% memory; `benchmark-harness.md:43`: a burst that doesn't fit is a finding, not squeezed in.

Finding: CI is at its declared ceiling, no relief valve — cost that night: two workers blocked at `checks`, ~1hr aggregate wall-clock lost.

Three options: (1) run C3, flip node-03 to member if it clears — #14409 2026-07-05: `CI_STICKY_PINNING_ENABLED` must verify on first or pods strand on /ci-storage misses; #16278/#16288: widening ci from one to three once degraded the supervisor pin to scheduler luck, starving the merge-queue coordinator; (2) reduce demand — the 4-way 4Gi typesafety fan-out and 5-CPU unit-tests step starved, unchecked if measured or inherited; (3) fix #16374 to degrade to slow, not terminal.

Not yet done: no node label touched — Talos-source IaC, hand-pushed, not deploy-pipeline; needs its own project, behind the C3 gate.

Project #16375, someday_maybe, domain pipeline, no objective; from retired `notes` attribute, 2026-08-15.
