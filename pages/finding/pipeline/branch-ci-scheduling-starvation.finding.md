---
id: aff530a1-4880-5440-9c0c-a7845cb1d632
page-type-slug: finding
title: "Branch CI scheduling starvation"
domain-slug: page-type/pipeline
---

# Claim

Branch CI's ~8.7-minute average is caused by scheduling starvation from `pipelineMaxRequests`-driven single-node pinning of tier-2 pipelines, not by insufficient work or cluster capacity; per-node checkout materialization (~5s warm) would let that pinning relax safely without reintroducing the workspace-miss #14409 fixed.

# Evidence

Project #17568, domain `pipeline`. Never defined: carried only a capture, moved from the row's retired `notes` attribute 2026-08-15.

Problem: branch CI averaged ~8.7m over 10 runs, cause scheduling starvation. Every tier-2 (branch) pipeline binds to ONE node via `assignedNode` (`ci-pod-dispatcher/enrich.ts:269-320`, `pipelineMaxRequests` threshold, applies only to unbound tier-2 branches). Measured 2026-08-03 over 9 branch runs: cluster mean CI utilisation 12.9% of 91.7 allocatable CPU (peak 35%) while steps waited; per-pipeline mean concurrency 1.6-4.0 against 123-141 steps; pipeline 26963 sat `dispatching` 590s against a full bound node then ran clean in 273s; 89-111 defer events/run; 26977/26950/26943 all node-06, 26963/26953 node-05 (12 CPU). Confinement prevents the workspace-miss #14409 looped on: `/ci-storage` is node-local.

Why cheap: `/ci-storage` has no shared state, so N-node materialization is N independent ops. Warm-node cost: `preparation-prep` 4-6s, `preparation-provision-ci-toolchain` 0.0s - ~5s against 500-900s lost to confinement.

Plan (order load-bearing, #14409 lesson reversed - materialize before relaxing pinning):
1. LANDED (commit a7b59c5a3e, 2026-08-03T12:08:33.737Z): per-sha install concurrency-safe under flock, `.install-done` sentinel re-read inside it (`prep-deps-commands.ts`); verified by `prep-deps-commands.cli.test.ts`, typecheck/biome clean.
2. DESIGN SETTLED, unimplemented: materialization must run as an init container (some step images lack git; `buildTreeIntegrityGate` skips there). Script extracted to `@infra/k8s-types` (hosts `orchestrator-cache.ts` prior art), consumed by `prep.workflow.ts` and `pod-spec.ts` (avoids the forbidden workflows->orchestrator direction).
3. Not started: relax tier-2 pinning only after step 2 proven; main/merge-queue (tier<2) keep reserved-node binding, Alan's constraint.

Not yet measured: whether a CI member never having seen a branch pays materially more than the 4-6s figure.
