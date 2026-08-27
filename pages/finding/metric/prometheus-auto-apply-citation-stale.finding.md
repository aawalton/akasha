---
id: 7b0f532b-3580-51c0-b555-ce86e872555d
page-type-slug: finding
title: "Prometheus auto apply citation stale"
domain-slug: domain/metric
---

# Claim

Five prometheus docs under `packages/infra/k8s/prometheus/docs/` (auth-health-alert, domain-expiry-alert, kubepods-slice-oom-tripwire, macbook-inference-alert, main-pipeline-contiguity) claim config changes do not auto-apply, citing #14461, but two #16370 pipeline legs (26100, 26127) auto-applied with no manual redeploy and `synth-prometheus-configs.ts` is in `watchNodes`; #14461 looks like an unrelated merge-queue emit gap fixed 2026-07-03, unconfirmed against the docs' claim.

# Evidence

[2026-07-26T03:00:41.603Z] Surfaced by worker-16370 closing #16370; handed off rather than edited, since four/five subsystems is beyond one worker's authority, and filed rather than acted on because the citation needs checking before any doc is rewritten.

Five docs claim no-auto-apply, citing #14461: auth-health-alert.md, domain-expiry-alert.md, kubepods-slice-oom-tripwire.md, macbook-inference-alert.md, main-pipeline-contiguity.md (worker reported four; sweep found a fifth, domain-expiry-alert.md).

Contradicting observations: both #16370 legs auto-applied with no manual redeploy — pipeline 26100 (explicit-seed, 8/8) and 26127 (fold-only, 8/8, touching no seed at all). `synth-prometheus-configs.ts` IS in `watchNodes`, verified at `packages/infra/k8s/prometheus/foundation.workflow.ts`.

Check the citation FIRST: #14461 looks like the merge-queue partial-land emit gap, fixed 2026-07-03 — not a watch-gate claim. If that holds, fix by removing the claim, not re-verifying it; if watch-gate-related after all, it may have been true once, and the question is when it stopped.

PRESERVE the subPath caveat, independently true: both ConfigMap keys are subPath mounts, so the rollout restart is genuinely load-bearing; only the auto-apply claim is stale. Deleting the whole paragraph would break something true.

Why fix rather than leave: the failure asymmetry runs the wrong way — a wrong no-auto-apply costs one unneeded step; a wrong auto-applies teaches skipping a needed step and the change silently fails to land. The safe-direction error surfaces no evidence against itself. Fix should state what IS required (rollout restart, subPath), not merely relax the claim.

Related: #16394, a second five-copy doctrine found the same night — same shape (copy drift), different content and mechanism; worth cross-referencing, not merging.

Captured, never defined — moved off the retired `notes` attribute on 2026-08-15.
