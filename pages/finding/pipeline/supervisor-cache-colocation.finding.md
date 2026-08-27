---
id: c1f12c45-a01f-586c-abce-c6e36048ec47
page-type-slug: finding
title: "Supervisor cache colocation"
domain-slug: page-type/pipeline
---

# Claim

Giving worker-supervisor a workload class disjoint from all CI (as #16288 was scoped to do) would remove its co-location with node-06's warm graph/configs caches and cost ~102s per pipeline creation against a 240s tick deadline — the same stall the disjointness was meant to cure. The correct isolation boundary is [supervisor + main/merge-queue CI] vs [branch CI], not supervisor vs CI generally, and building that boundary collides with #16287, which opened node-06 to branch CI for capacity.

# Evidence

Project #16340 (domain: pipeline, status: someday_maybe, live-on: deploy). No initiative named.

#16288 was scoped to give worker-supervisor a disjoint workload class from CI, on the argument (aranya's, endorsed by the filer) that supervisor and CI converge by construction. worker-16288 stopped before building it and measured instead; the premise was inverted.

Measured from `pipeline_orchestrator.main_pipeline_creation_duration_ms` over 7 days: graph cache 77.6% hit (135 hits at 462-1994ms vs 39 misses at 42.8-424s); configs cache 65.7% hit (hits 5-33ms vs misses 48-360s). Bimodal, empty 5-30s bucket. node-06 cache warm at measurement: 57 files, 2.4GB. Full disjointness would push both caches to 100% miss: ~102s added at p50 against a 240s tick deadline.

The real need is co-location with tier<2 CI (main + merge-queue, already pinned to node-06 — verified in source), not disjointness from all CI. Disjointness is needed only from tier>=2 branch CI, whose caches the supervisor never reads. Aranya's convergence argument survives but applies only to the branch-CI half.

#16287 (landed same night) opened node-06 to branch CI for 32 idle cores — directly opposed. Proposed way out: serve the ~45MB graph/configs artifacts over network or an RWX volume, decoupling placement from cache locality.

Two implementation constraints: (1) two co-location deps — `/ci-storage/graph` and `/ci-storage/configs` (`pipeline-configs-sha-pinned.ts:82,178-181`); (2) no node has a free primary workload-class (all six claimed).

Filer decided (not deferred to Alan): measure first, build nothing yet — the night's starvation had two now-fixed causes. áine's post-lift measurement of the supervisor's cgroup under real load: 0.72 on node-06 vs 9.46 on node-05 at the prior eject — 13x improvement, 36% of the re-hold tripwire. This row may never need building if that holds.
