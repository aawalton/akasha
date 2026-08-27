---
id: 33717d50-b885-54f6-95a8-a666913635b3
slug: contract-gated-on-green-not-landing
page-type-slug: finding
title: "Contract gated on green not landing"
domain-slug: domain/global
---

# Claim

A contract migration is gated on the landed change's pipeline passing, which is stricter than landing.

# Evidence

`domains/migration.md` states "A contract is applied only after the change that needs it has landed". The deploy verb's gate is not landing but a green pipeline over the landed commit: `packages/alanwalton/projects/cli/src/pure/decide-migration-phase-action.ts` returns `{ kind: "skip", reason: "main-deploy-not-passed" }` whenever `mainDeployPassed` is false, and `packages/alanwalton/projects/cli/src/lib/move-to-deploy-migrations.ts` runs the contract phase only after `waitForMainDeploy` verifies the main deploy green.

The two come apart in a state the code holds open. A change whose main pipeline goes red stays landed — `main_deploy_failed` sits in the landed status set beside `main_deployed` at `packages/infra/ci/merge-queue/coordinator/src/coordinator/operator-batch-eject.ts`, and no revert path was found in the merge-queue coordinator or the deploy verb. So a landed change can stand with its contract migration never applied, which the standing line reads as covered.

The line is not false: "only after" states a necessary condition and the code satisfies it. What a reader takes from it is that landing is the trigger, and landing is not.

Not measured: whether any path outside the deploy verb applies a contract migration, and whether the same gap reaches the expand phase.
