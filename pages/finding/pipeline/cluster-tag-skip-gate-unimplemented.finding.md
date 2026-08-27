---
id: fa46c673-6f5a-5fe3-b092-786c1e50a559
slug: cluster-tag-skip-gate-unimplemented
page-type-slug: finding
title: "Cluster tag skip gate unimplemented"
domain-slug: page-type/pipeline
---

# Claim

The `skipIfTagExists` field is read by the bootstrap-CLI/benchmark executor but never read anywhere in the cluster CI path, so the 561 cluster build-step runs measured in a 24h window that were supposed to be gated by it were not, and its only live cluster-side effect is the inverse of a skip: keeping a step that would otherwise be dropped by the closure-miss check.

# Evidence

Project #16404 (status someday_maybe, domain pipeline), spun out of #16402, which proved the gate does not exist cluster-side. Do not implement as a reflex: arming it makes a stale-image hazard live, and the CI saving is assumed, unmeasured.

Measured on #16402, 2026-07-26, by registry inspection and step logs: `skipIfTagExists` (declared on `Step`, workflow-dsl/src/dsl/types.ts:181) is implemented only in `@infra/local-executor/src/execute-step.ts:79-89`, via HEAD probe `checkTagExists` (:33-60) — the bootstrap-CLI/benchmark path. The cluster path never implements it: materialized to a string (pipeline-configs.ts:137-141), copied into pod-spec StepConfig (launch-builder.ts:293), never read in ci/orchestrator/src or ci/worker/src. Its only live cluster effect is the inverse of a skip: `stepBypassesClosureGate` (select-for-trigger-readers.ts:71-78) keeps any step carrying it. Measured 2026-07-26: 561 build-step runs across 11 build steps against 565 pipelines in 24h, all supposed to be gated, none was.

The decision this row owned: implement cluster-side, or delete the field. First step is measurement: BuildKit's persistent local cache (/var/lib/buildkit) may make a no-op rebuild cheap, so the CI saving needs measuring before treated as real — #16402 was created on an unverified intuition and was wrong.

If implementing: cannot land alone — arming it makes the three static-tag CronJob services (stats-bridger, gfs-promoter, annual-dump in cronjob-service-steps.ts) start shipping stale images silently on green deploys, safe today only because the gate is broken; tag discipline must land in the same change.

If deleting: remove the field from Step, the local-executor, the pod-spec StepConfig, and stepBypassesClosureGate — removing the bypass changes dispatch behavior, needing its own verification.

#16402 landed check-step-config-field-consumption, classing this field declared-inert; resolving this row must update that or the check reds by design.
