---
id: c844ca85-b901-5661-b9ba-0efddae1a829
slug: completedat-coupling-blind-spot
page-type-slug: finding
title: "Completedat coupling blind spot"
domain-slug: page-type/pipeline
---

# Claim

`completedAt-coupling.fizz` model-checks and passes "completedAt set iff pipeline terminal," but its writer domain excludes `trigger_pipeline`'s status-only supersede patch, the actual source of every violation.

# Evidence

Found by worker-16242 while proving #16242; filed separately, out of scope.

INVARIANT. `completedAt` is documented set iff a pipeline is terminal. `completedAt-coupling.fizz` model-checks it and passes.

GAP. The spec quantifies over a writer set excluding `trigger_pipeline`. Its supersede patch is status-only — writes terminal status, never sets `completedAt`. The proof holds over modeled writers, says nothing about the one producing violations.

MEASURED (worker-16242, live DB): 68 terminal pipelines carry terminal status with no `completedAt` — 59 of 62 superseded, 9 of 9 canceled. Writer-driven terminals are 100% clean: completed/failed/resolved across 13,706 rows, zero violations. Split runs exactly along the writer boundary.

WHY IT MATTERS. A model checker is the most trusted Reliability rung, reached precisely for certainty. A spec green because its domain excludes the offending writer gives more false assurance than no spec — it terminates inquiry. "Proven" is a claim about a domain, invisible in the verdict.

SECOND DEFECT, DOC. `packages/infra/ci/worker/CLAUDE.md` principle 6 names the operator UI path compliant. It is not — the UI cancel patch is one of the two violating writers (9 of 9 canceled).

CONTROL-FLOW IMPACT NIL, recorded anyway. No decider guard, loader filter, or UI sort reads `completedAt`; `ops pipeline perf` falls back correctly. The value is not the 68 rows but that the strongest rung can be green over an incomplete domain, unsurfaced.

CANDIDATES, not a decision: (a) extend the fizz writer domain to include trigger_pipeline, then set completedAt on supersede or make the invariant conditional; (b) backfill the 68 rows, needed only if (a) tightens it; (c) fix the CLAUDE.md principle-6 claim regardless — wrong today; (d) can a spec declare its writer domain and a check verify it is complete, turning luck-found defects into a class prevented by construction. Prefer (c), then (a); (d) may warrant its own row.

Was #16290.
