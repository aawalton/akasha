---
id: 4caa7f79-d71c-5c15-9581-3fa7fa1ecf76
page-type-slug: finding
title: "Sticky bind ranks step not pipeline"
domain-slug: page-type/pipeline
---

# Claim

The branch-node sticky bind ranks candidate nodes against the binding step's own podRequests rather than the pipeline's peak resource shape (pipelineMaxRequests), even though sticky pinning commits the whole pipeline to that node for every later step.

# Evidence

Handed off from #16230 (node-selection comparator, landed and prod-verified 2026-07-25) as a deliberate scope split.

Live confirmation at #16230 finish: pipeline 25941 was pinned to node-01 and sat deferring a 4096Mi step against 1422Mi free, while node-05 held 7534Mi free; node-01's max-free (5518Mi) admits it eventually, so this is a wait, not a never-fit, but likely avoidable by ranking against the pipeline's peak shape. Example pipeline spans steps at 512Mi/750m, 4096Mi/2000m and 1024Mi/5000m — an order of magnitude apart on both axes, with the CPU-heaviest step not the memory-heaviest.

Proposed: rank against pipelineMaxRequests (already used by #14845's ever-fit filter at the same call site), ordering-only, must never affect admission.

Correction recorded before dispatch: mostHeadroomFitting(req, remaining, candidates) uses req twice — as the eligibility filter fits(rem, req) and as the ranking divisor headroomRatio(r.cpu, req.cpuMillis) (select-next-placement.ts:314-316). A naive swap of podRequests -> pipelineMaxRequests at the call site (:211-213) moves both uses at once, making the gate stricter ('fits the heaviest step now' instead of 'fits the current step now') — an admission change, risking fleet-wide halts. Fix must separate the two: keep the fits-now filter on podRequests, move only the ranking basis to pipelineMaxRequests.

Verification standard set by #16230 (13/13 fizz plus a demonstrated failed invariant on reverted-to-known-bad input): extend select-next-placement.spec.ts/.fizz, keep the AxisNeutral invariant.

Sequencing: a tighter gate makes non-fitting binds halt rather than bind-and-starve; #16287 (opening node-06 to branch CI, Alan's direct instruction) is the needed sink and must land with or before this.

Corrected premise to carry forward: CI is not memory-bound at ~20:1 in general — 1024Mi/5000m in the same pipeline is decisively CPU-bound (47% of node CPU ceiling vs 20% memory); do not reintroduce a memory-first assumption.

Was #16280.
