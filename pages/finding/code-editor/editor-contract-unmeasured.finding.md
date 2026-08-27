---
id: 0977a3af-60f6-5cdb-ae47-d01fa866282e
slug: editor-contract-unmeasured
page-type-slug: finding
title: "No check in either repository measures the shared status-bar contract the code editor depends on"
domain-slug: domain/code-editor
---

# Claim

The code editor's status bar depends on the runtime and type contract of `@shared/status-bar-access` in the code repository, and no check in either repository measures that dependency. A change to the shared package that passes every gate in the code repository can blank Alan's whole status bar, including the parts of it the change had nothing to do with.

# Evidence

Measured on 2026-08-18 while working #19387, which set out to remove the project half of `get_status_bar_snapshot` on the stated ground that nothing would read it once `api.project-counts.ts` moved to the page query service.

Two call sites in `~/code-editor` carry the dependency:

- `extensions/ops/src/features/status-bar/activate.ts:111` calls `getStatusBarSnapshot(sb, { metricsSince, doneSince })` with `doneSince = getEsoResetTime(now)`.
- `extensions/ops/src/features/status-bar/readers.ts:27` returns `foldProjectProgress(s)[column][bucket]`, the bar's ten project numbers.

The editor resolves `@shared/*` through a `node_modules` symlink into `~/code`, so those packages are a live contract for a tree the code repository's CI never opens.

What the removal would have cost: `projectCounts` and `doneTodayByTrack` are required keys on `snapshotSchema`, so dropping them makes `snapshotSchema.parse` throw rather than degrade. The throw is in `getStatusBarSnapshot`, above the split between the project half and the pipeline half, so the bar also loses its merge-queue, pipeline and step numbers, none of which the project touched.

Nothing would have reported it. The `ast-unused` pragmas on `packages/shared/status-bar-access/src/index.ts` already record that `ops audit ast-unused` cannot see that repository, so the export NAMES survive; what has no guard at all is the SHAPE they carry. Branch CI passed 90 of 90 steps on the change that kept the keys and would have passed the same 90 on one that dropped them.

A check here that opened the editor's tree is ruled out from two directions: `domains/check.md` intends that no check's verdict turn on state outside its own repository, and `domains/repos/code-repo.md` deletes checks that reach across. What stands between here and safety is the intent already on `domains/code-editor.md` — the editor's build resolving everything inside its own checkout.
