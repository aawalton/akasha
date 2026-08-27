---
id: d77a9ff6-39a5-54b6-ae34-37c8aaf31799
slug: ci-workflow-graph-counts-only-what-loaded
page-type-slug: finding
title: "CI workflow graph counts only what loaded"
domain-slug: domain/global
---

# Claim

`check-ci-workflow-graph` reports the same population figure whether or not a workflow it was meant to validate could be imported, because its denominator is counted after the failures have been dropped.

# Evidence

Observed on 2026-08-10 in the tree at `/home/walton/worktrees/18484` (branch `project-18484`), where an unrelated seat's uncommitted edit left `packages/infra/checks/src/checks/../lib/check-configs-addons-runtime-gates.ts` referencing an undefined `ADDON_SOURCE_POPULATION`, so `packages/infra/checks/src/checks.workflow.ts` — the file that builds the whole `check` workflow — could not be imported.

`loadWorkflows` in `@infra/workflow-dsl/discovery` catches that import failure, prints `[discovery] Failed to import packages/infra/checks/src/checks.workflow.ts, skipping: ADDON_SOURCE_POPULATION is not defined`, and returns the rest. `check-ci-workflow-graph.cli.ts` says so in its own header at the `loadWorkflows` call site, so the swallow is documented rather than accidental.

The two readings, taken minutes apart against the same repo:

- In that tree, a direct `loadWorkflows` call over the scanned set returned 58 of 60 files, and the `check` workflow was absent from the loaded set. `bun packages/infra/checks/src/checks/check-ci-workflow-graph.cli.ts` nonetheless exited 0 with `OK — 59 workflows validated [over 59 of 59 workflows]`.
- Against the same commit extracted to a clean tree with none of the uncommitted edit, `loadWorkflows` returned 59 of 60 and `check` was present. The check again exited 0 with `OK — 59 workflows validated [over 59 of 59 workflows]`.

So the two states — the workflow validated, and the workflow never seen — print the same line and the same figure. The `59 of 59` is not wrong on its own terms: it is the count of what loaded, measured against itself, so the ratio is 1 by construction and cannot fall. The count of files SCANNED, which is the term that would have shown the gap, is 60 in both cases and is not reported.

What this cost here: the `check` workflow is where the change under review lands, so a green verdict from this check said nothing about it. That was only visible because the failure printed a console warning that happened to be read.
