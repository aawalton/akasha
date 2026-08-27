---
id: 851aea51-a8ef-506d-8feb-2f096490f22c
page-type-slug: finding
title: "Supervisor pinned by storage"
domain-slug: domain/node
---

# Claim

worker-supervisor's placement onto a CI-class node is structurally forced by its node-local `ci-storage` hostPath mount rather than an available capacity tradeoff, so it cannot be moved off the CI-contended tier, and `packages/infra/ci/orchestrator/k8s/synth.ts` does not declare the `nodeSelector` that placement actually depends on.

# Evidence

Project #16218, domain `node`, `someday_maybe`, captured but never defined.

Contributing cause of the 2026-07-25 merge-queue outage (primary cause: config-load cap, #16203). Live: `worker-supervisor` (merge-queue coordinator, CI orchestrator, ci-pod dispatcher, main-pipeline-creator, ~37 workers) has `nodeSelector {ci:true}`, requests cpu4/mem12Gi — placed by the CI membership label, competing with the workload it orchestrates. Harm: 8 CI step pods co-located on node-05; config-load CPU-starved past its 150s cap (worker-16203: 196 CPU-s/237s wall, contended not hung); merge queue landed nothing ~100min.

Not covered by #16149 (node-label disjointness): stripping `workers` from node-05 moves nothing — worker-supervisor is chosen by the ci label, so it would reproduce co-tenancy elsewhere. Compounds with #14409: CI placement reserves node-06 for merge-queue/main by pushing branch CI onto node-01/04/05 — the policy protecting merge-queue capacity starves its own control plane.

2026-07-25T16:31Z resolution: answered by storage, not capacity. `worker-supervisor`'s volumes include `ci-storage` hostPath `/var/lib/ci-storage`, NODE-LOCAL; per the infra pinning invariant (pin only for node-local storage/hardware), and since the deploy step discovers `*.worker.ts` under `/ci-storage/checkouts/<sha>/packages/` (empty off a ci node), the supervisor MUST live on a ci-class node — co-tenancy is structural. For #16203: moving the control plane off the contended tier is unavailable; the config-load cost (worker-16203's C1 write-back cache) is the only remaining lever.

Edit owed in `synth.ts`: declare the ci nodeSelector (warranted by the hostPath); delete stale header lines 6-7 pointing at a nonexistent `workers`-class selector; correct :70 (a different pin, `capabilitySelector('workers')`, was removed at Talos cutover, not this one). Answers #16215's open "IaC drift" question: the undeclared live selector is not drift, it is real and required.
