---
id: bc46b562-02d1-590a-9fee-030bcc5792e9
slug: pin-selection-and-deferral-policy-gaps
page-type-slug: finding
title: "Pin selection and deferral policy gaps"
domain-slug: page-type/pipeline
---

# Claim

Split from #16374, two placement-policy causes remain undecided: pin selection (`select-next-placement.ts`) filters hosts by a pipeline's single heaviest step rather than its concurrency, admitting structurally impossible placements found only at launch timeout; and deferral (`select-next.ts`) is a per-host `continue` holding no reservation, so smaller newer steps backfill a waiting step's gap — dispatcher-arbitrated inversion by size, reproduced live in pipeline 26097.

# Evidence

Split from #16374 (dalla); #16374 landed 3 DEFECT fixes (doc claim, retry refusal arm, wrong-node diagnostic). This row: causes A/B, a placement-POLICY change needing its plan/risk envelope.

A: pin selection ignores fan-out width. `select-next-placement.ts` filters hosts by `pipelineMaxRequests`, the single heaviest step. A pipeline needing 4x4Gi concurrently is admitted to a node with 4.6Gi free (4Gi<=4.6Gi) — concurrency never consulted; impossible placement found only at launch timeout.

B: deferral holds no reservation. `select-next.ts` makes defer a per-host `continue`; a deferred step holds nothing, so smaller newer steps backfill its gap. #15471 removed scheduler-arbitrated inversion; this is dispatcher-arbitrated inversion by size — FIFO by pipelineSeq honoured per admission, but a step that never fits never reaches one.

LEAD EVIDENCE — pipeline 26097, aranya 02:05Z, `project-16374`: `capacityWait.waiting` 47; node-01 13%cpu, node-04 13%, node-05 94% (bound), node-06 37%. 50 pods on node-05, all from 26097; cpu ~10.7 of node-05's 12 (1x3000m+10x750m+1x200m) — competed with itself, verified. node-05 was roomiest node when pinned (7%cpu/19%mem at 02:00Z), saturated itself in 2min; pinning barred node-01/node-04 overflow.

Severity (aranya): DRAINED — 535s wall/1893s total step time (3.5x parallelism), 0 starved steps; a self-queue that cleared, not starvation. Cost: sticky pinning turns spare capacity into a per-pipeline single-node bottleneck; unpriced.

OPEN LEAD (aranya): `check-typesafety-bundle-temper-rest` — 26097 (drained) 235s vs 26033 (#15955, 3 terminal) 54+min, pinned at 2000m throttled, ~14x. Hypothesis: throttling self-reinforcing; reordering alone won't fix it. Check requests/limits both.

DECIDE HERE (dalla): pin has one writer, no clearer. #16374 made `pipeline retry` honest, not useful. Should it stay sticky? Clearing on retry could cure it. Decide if B subsumes this; else file separately.

Captured, never defined — moved off the retired `notes` attribute on 2026-08-15.
