---
id: e107b57f-569c-5537-b5fa-0a9f0b69d88b
page-type-slug: finding
title: "Retry clear narrows to preparation"
domain-slug: page-type/pipeline
---

# Claim

The stale-pin clear-on-reset fix at `4becbf97d3` only clears `assignedNode` when a reset step's `failReason` starts `capacity-starved:` AND the reset subtree includes `preparation`, since the `/ci-storage` checkout is materialized on one node and only `preparation` is exempt from the workspace check — the fix repairs a stale pin already formed, but does not prevent one forming; #16217's comparator fix is what makes that unreachable.

# Evidence

Project #16232, domain `pipeline`. Owner athena, impl. astra.

Implemented at `4becbf97d3`. Condition: clear `assignedNode` IFF a reset step's `failReason` starts `capacity-starved:` AND the reset subtree includes `preparation` — the workspace invariant: `/ci-storage` sits on one node; `pod-spec-entrypoint.ts` exempts only `preparation` from the workspace check, other workflows exit 3 off-node with no retry arm. `decide-retry.ts` resets only FAILED/dependent-blocked workflows, so starvation after preparation completed leaves it unreset — clearing the pin there rebinds to a checkout-less node, total failure not a wait. Cohort: 25886/25907/25909, all starved at `preparation-provision-ci-toolchain`.

Three limits: (1) ~2 rescued pipelines re-bind to node-01, not node-06, may starve there (node-01's 5518Mi admits two 2Gi steps before overflow) — expected, not a regression; #16217 takes it to 12/12. (2) 6 of 12 pinned pipelines are ember's, won't redispatch under Alan's Temper pause (25899-25902, 25907, 25909 — last two are M1 exit blockers), so realized benefit is smaller than the arithmetic. (3) Repairs a stale pin, doesn't prevent one — #16217 makes staleness unreachable for the population needing repair; the two compose.

Verification: 25 unit tests pass in `decide-retry.unit.test.ts` (5 new, two-sided: clear-arm asserts `assignedNode === null`, keep-arms assert undefined). Typecheck clean. `listStepsForPipeline` applies no `select:` projection, so `failReason` reaches the predicate — checked not assumed.

Halt-time 2026-07-25T16:38Z (astra implementer, athena owns row): left at implementation per Alan's full-halt directive relayed by aine. Pushed pre-halt on branch `project-16232` at `4becbf97d34aa7adbfdbcc21725a7b5c7bd3b6a8`; worktree clean. Files: `decide-retry.ts` (predicate + `pipelineResetSet()`, `RetryStepSnapshot` gains `failReason`), `run-retry.ts`, `decide-retry.unit.test.ts`.

Same class as #16223: a stale reference inherited by a later op.
