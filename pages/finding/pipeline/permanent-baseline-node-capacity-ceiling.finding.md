---
id: ae807355-2be7-5757-add9-c197a0fc480a
page-type-slug: finding
title: "Permanent baseline node capacity ceiling"
domain-slug: page-type/pipeline
---

# Claim

Retrying a capacity-starved CI pipeline is not a cure today: the `assignedNode` pin persists unchanged across a retry, so the pipeline re-enters the identical starve against the identical node until the pin is cleared — verified on pipeline 25952, whose `assignedNode` stayed `node-04` across a retry with 90 steps and both workflows reset.

# Evidence

Distinct from sibling #16307: that resolves as transient work drains; this doesn't — the node's occupancy is permanent.

Retry is not a cure: pipeline 25952 read assignedNode=node-04 before and after a retry, 90 steps, both workflows reset, pin untouched — retrying a capacity-starved pipeline re-enters the identical starve against the identical node.

Manual remedy: clearing assignedNode on the PIPELINE row (not step rows) via the boundary-respecting update path re-binds it — on 25952 the provision-ci-toolchain step, starved 45 minutes, completed in 98ms once freed. Only safe when the pipeline is cold (preparation barely started): the per-node ci-storage checkout lives on the bound node, so a mid-flight move sends steps hunting a checkout that isn't there (the wget-127 case this prevents).

Consequence, 2026-07-25: six pipelines simultaneously stuck, all pinned to node-01 or node-04, preparation barely started (25947, 25963, 25967, 25969, 25970, 25971) — one that evening's own IaC-drift pipeline.

Row's hypothesis (permanent non-CI workloads can never satisfy a larger request) was refuted 2026-07-25T21:19:51.986Z by worker-16243's real-ceiling computation: node-capacity.ts:176-205 already computes maxFree as allocatable minus standing residents only, the subtraction this row proposed; ci-storage-maintain was correctly counted as a DaemonSet. Measured ceilings: node-01 14.83Gi allocatable/9.44Gi standing/5.39Gi maxFree; node-04 15.07/10.05/5.02Gi; node-05 30.66/7.81/22.85Gi; node-06 62.23/35.24/26.99Gi. The stuck 2Gi step on node-04 sits below its 5.02Gi ceiling, fitting once a 4Gi transient pod drains — filing never-fit work duplicates functioning code.

Fix directions raised, not decided: exclude non-CI-baseline nodes from CI binding, bind against realistic CI residual, or clear-pin-on-starved-retry.

Project #16308, someday_maybe, domain pipeline. Captured, never formally defined; moved here off the row's retired `notes` attribute on 2026-08-15.
