---
id: 992da729-353e-5b12-9366-fba19de67782
slug: check-help-claims-full-run
page-type-slug: finding
title: "Check help claims full run"
domain-slug: domain/global
---

# Claim

`ops project check --help` states that every registered check runs on every check pipeline. The step-level closure filter contradicts it: of 191 assembled check steps only 19 are unconditional, and the rest are gated against the branch's changed files before the pipeline is triggered. Three measured pipelines materialized 109, 109 and 119 check steps. A reader of that help believes a green branch verdict covers the whole registry, and compares its duration against a band written for a full run.

# Evidence

`packages/alanwalton/projects/cli/src/project/check.help.ts` epilog: "Available QC checks (all of them run on every check; --only is refused)".

The refusal message in `packages/alanwalton/projects/cli/src/project/check.ts` reads "The orchestrator materializes every check step page when the pipeline is triggered". That is true only relative to `onlyCheckNames`, whose filter runs against a workflow with no step pages and is therefore a no-op. It is not true of the step set as a whole.

`packages/infra/ci/worker/src/select-for-trigger-step-filter.ts` — `applyStepLevelClosureFilter` mutates `entry.config.stepDefinitions` in place before the trigger, keeping a step only where `closureIntersectsChangedFiles(graph, seeds, entry.changedFiles)` holds, or where the step is `alwaysRun`, or where the force-keep registry names it. `trigger_pipeline.sql` then creates one step page per surviving entry, so the trimmed set is the pipeline's permanent inventory.

`packages/infra/checks/src/checks.workflow.ts` assembles 191 steps, of which 19 carry `alwaysRun: true`, and none have empty seeds.

Measured on 2026-08-04 with `ops pipeline steps`: pipeline 26980 ran 109 check steps, 26977 ran 109, 26968 ran 119.

Noticed while measuring branch CI duration against the bands in `skills/ci/SKILL.md`, which measure a full pipeline. Fourteen days of branch-CI resolutions were compared against those bands before the discrepancy surfaced, so every duration read that way understates a full run by an unknown margin.
