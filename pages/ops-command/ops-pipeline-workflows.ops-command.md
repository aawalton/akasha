---
id: 7a120871-2a17-5fb5-8e3a-d8a0387dae43
page-type-slug: ops-command
title: "Ops pipeline workflows"
slug: ops-pipeline-workflows
domain-parent-slug: domain/ops-pipeline
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/pipeline/workflows.ts
path: pipeline workflows
---

# Definition

- **Ops pipeline workflows** — one pipeline's workflows, each with its status, the steps that failed and the reason it carries.

# Help

List workflows for a pipeline, showing name, kind, status, failed/blocked step names, and a combined reason. Columns: name, kind, status, failedSteps, blockedSteps, reason.

`failedSteps` names every step that made the workflow terminal-negative — `failed`, `blocked`, or operator-`resolved` — for a workflow whose step rollup ran: the apply layer persists the rollup's step-name list onto the row (project #15982). Step-level detail — each named step's own `failReason` and `duration` — lives in `ops pipeline steps --seq <n>`.

Either column reads `unavailable` (TSV) / `null` (JSON) when the row carries no such attribute, which is NOT the same as an empty list. For `failedSteps` that means no failure diagnosis was recorded — the workflow never failed, it failed before persistence shipped, or it was failed by a path other than the step rollup; an empty list (blank TSV cell / `[]` JSON) means the rollup ran and found nothing negative. For `blockedSteps` unavailable is EVERY row: no write path produces that attribute at all, because the rollup folds blocked steps into the `failedSteps` list rather than a separate one. Absent is reported as unavailable rather than as an empty list because an empty result that cannot be anything else reads as a measured 'no steps failed' and is indistinguishable from a real one.

`reason` carries whichever of `skipReason` (the workflow was skipped — a deploy-ref or inputs-hash match short-circuited it) or `failedDependency` (the name of a dependency workflow that failed or blocked, forcing this one to `blocked`) the row holds; a retry clears both together, so the two are never both present. It renders whenever either is populated, on any status — the pipeline-terminal cascade can sweep a `blocked` workflow to `resolved` without touching its `failedDependency`, so a stale-looking `resolved` row can still carry the reason it was really blocked.

Default stdout: one TSV row per workflow — `<name>\t<kind>\t<status>\t<failedSteps>\t<blockedSteps>\t<reason>\n`. Empty result → empty stdout, exit 0.
--json stdout: `[...]` array of `{ name, kind, status, failedSteps, blockedSteps, createdAt, updatedAt, skipReason, failedDependency }` on a single line. `failedSteps`/`blockedSteps` always carry the key, `null` for unavailable; the rest are OMITTED when the row carries no such attribute rather than emitted as `null` — test those for presence, not for null.
