---
id: 298055c4-f6fe-5c1f-8624-eb74b39052ab
slug: deploy-passes-on-empty-workflow-set
page-type-slug: finding
title: "Deploy passes on empty workflow set"
domain-slug: domain/global
---

# Claim

`decideDeploySuccess` returns a main-deploy pass witnessed by nothing when its expected-workflow set is empty, and the consumer turns that into `{ok: true, passed: true, status: "completed"}`. The decider one layer out already refuses the same condition, so the correct reading exists in the estate and only the inner call path disagrees with it.

# Evidence

Read on main 2026-08-07.

`packages/alanwalton/projects/cli/src/lib/deploy-success-decision.ts:115` returns `{ kind: "success", coverage: [] }` when `s.expectedWorkflows.length === 0`, immediately after the `ancestryHolds` guard. `deploy-resolved-decision.ts:189` tests the same `expectedWorkflows.length === 0` on the other call path and refuses it before ever calling `decideDeploySuccess`. `move-to-deploy-wait.ts` consumes `kind: "success"`, derives its witness sequence by `Math.max` over the coverage array — `null` on the empty one — and returns a pass, so a vacuous decision reaches the deploy verb as a completed deploy.

Two upstream filters can empty the set: `decide-expected-workflows.ts`'s ready branch, whose own doc says the value can be `[]`, and the narrowing in `move-to-deploy-wait.ts` that intersects the ready set against the workflows present in the tree.

The fail side is testable today as a unit test on `decideDeploySuccess`; the pass side has no instrument, because no deploy the tree can schedule stages an empty expected-workflow set. `Population` on `domains/instrument.md` is what it contradicts: fail where you could not look at a population, rather than passing.

Recorded first by `worker-16942` on 2026-07-29 inside a quarantined document, and carried here because that document is queued for removal. Only the code claim above is carried: the account there of why the finding project could not take it rests on a `deploy-gate-acceptance.md` and a `DEPLOY_GATE_SURFACES` array, and neither exists in the code repo or in the quarantined head documents under `dirty/code/` today. I established the claim by reading the source, not by staging a deploy.
