---
id: c9cd3342-87a6-5259-bb42-906ece297845
page-type-slug: finding
title: "A deadness sweep cannot see a consumer in the code-editor fork"
domain-slug: domain/global
---

# Claim

`extensions/ops/node_modules/@shared/metrics-access` is a symlink into `packages/shared/metrics/access`, so the code-editor fork imports code-repo modules without any code-repo file naming them. A sweep over the code repository alone finds no importer and reports the module dead. Deleting it breaks the code-editor build, and with it every promote to Alan's editor.

# Evidence

Measured 2026-08-20. `getPipelineResolutionAvgByBranchCategory` and the types `AverageDuration` and `PipelineResolutionAverages` were deleted at `9f2cb25585` as unreached. Four files in `extensions/ops/src/features/status-bar/` import them — `activate.ts:8`, `render.ts:28`, `slot-types.ts:5`, `render.unit.test.ts:7` — and `npm run compile` fails with `No matching export in "../../../code/packages/shared/metrics/access/src/index.ts"`.

The reader was not dead in the other direction either. Called read-only, `public.get_pipeline_resolution_avg_by_branch_category(50)` returns all three categories populated — `main` 220309.92ms, `branchCi` 410281.44ms, `mergeQueue` 346244.96ms, n=50 each. Its feed is `metric_name = 'pipeline.time_to_resolution_ms'`, 4,000 rows, most recent 2026-08-19 17:44:46 UTC, inside a `public.metrics` of 28,828,488 rows. A positive control fired: `ops.command.duration_ms` was being written during the measurement.

So both a static sweep and a data check would have had to be wrong together for the deletion to be right, and only the static one was consulted.

`ops audit ast-unused` describes itself as reading both repositories. The code-editor fork is a third tree, and whether anything walks it is unmeasured — worth a planted control in `extensions/ops` confirmed reported by name before that description is trusted.

This is the fourth channel of its kind found in one night, and the pattern is worth more than any of the four. `instructions:tools/` holds around 810 references into the code repo as path literals and package specifiers loaded at runtime, so deleting a module raises no typecheck error and breaks a command only when someone runs it. `packages/shared/pages/proc/` is consumed as text by path through `readFileSync`, so a sweep there flagged 18 files of which 17 were live sources of the deployed database. `packages/infra/ci/cli/src/lib/write-changed-files.ts` is reached only as a shell string inside a workflow step. In each case the importer exists and the import graph does not carry it.
