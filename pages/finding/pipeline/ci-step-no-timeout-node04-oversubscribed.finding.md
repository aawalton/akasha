---
id: 7602f6e0-e9b2-5e1b-8ad8-4abed834023c
page-type-slug: finding
title: "CI step no timeout node04 oversubscribed"
domain-slug: page-type/pipeline
---

# Claim

A CI step that runs far outside its own historical duration distribution is not detected or terminated by anything in the pipeline system, and node-04's CI headroom is oversubscribed between a node-pinned toolchain step and a deliberately-sized typesafety shard, so one anomalous shard run stalls the preparation workflow of every concurrent pipeline on that node.

# Evidence

From project #16189 (domain: pipeline).

INCIDENT 2026-07-25 13:28–14:17Z: one CI step ran 48 min against a 0.7-min mean, stalling preparation for every concurrent pipeline. Resolved by hand; neither underlying defect was fixed.

MEASUREMENTS: `check-typesafety-bundle-temper-rest` on pipeline 25857 (branch project-16161, sophia) ran 49 min against a 7-day baseline of 474 runs, mean 0.7 min, max 4.7 min (~68x mean). Ruled out as wedged/starved: one core pegged continuously, 2.8M minor faults/0 major, cgroup memory under its 5.37Gi max, memory.pressure zero — consistent with runaway type-level instantiation; exact cause not established. Pod requested 4Gi.

DEFECT A — no step timeout: nothing terminates a step exceeding its own historical distribution, though the baseline (474 samples/shard, 7 days) already exists in the DB, unused. Fix shape: a per-step ceiling derived from it.

DEFECT B — big shards starve small node-pinned steps: node-04 has ≈5Gi real CI headroom; a typesafety shard requests 4Gi while the node-pinned `preparation-provision-ci-toolchain` requests 2Gi — they cannot coexist. Queue reached 8 waiting toolchain steps (oldest 22 min) across 4+ pipelines; the pinned step itself took 38ms once it ran.

REMEDY FOR B undecided; correction history matters. "Right-size the shard's 4Gi request" is REFUTED TWICE: it is deliberate placement tuning from #15576 (`packages/infra/checks/src/lib/check-configs-typesafety.ts:116-121`), sized just under node-04's ~5.1Gi max-free on purpose. Measured peak exceeds 4Gi request. Kernel ground truth (worker-16216, `/var/log/kernel.log`, persists ~32h vs the ~51-min `talosctl dmesg` ring others sampled): OOM kill at 14:23:17.527Z, CONSTRAINT_MEMCG, one process alone at anon-rss 5.22GiB, ≥104% of the 5Gi limit. Correlation to the typesafety step (exit 137) is consistent, not proven; do not upgrade downstream.

A related dispatcher finding sits under project #16195 (same domain).
