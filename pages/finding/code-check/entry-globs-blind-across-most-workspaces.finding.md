---
id: e714d46f-3840-5318-b14f-1df7ef8a5e4b
page-type-slug: finding
title: "Entry globs blind across most workspaces"
domain-slug: domain/global
---

# Claim

`pages/finding/code-check/entry-globs-make-a-package-unmeasurable.finding.md` records one package whose `ast-unused` entry globs make every source file a reachability root. It is 132 packages of 174. Measured across `ast-unused.config.json`, 132 configured workspaces declare `src/**/*.ts` among their entries, so no export under `src/` in any of them can be reported unused — and the check reports green over the lot. A further 202 sit in `pendingCuration` and 3 in `outOfScope`.

# Evidence

Measured here by parsing `ast-unused.config.json` rather than by reading it: `workspaces` holds 174 entries, and 132 of them carry `src/**/*.ts` in their `entry` list. The typical value is `{"entry": ["src/**/*.ts", "**/*.test.ts"], "project": ["**/*.ts"]}` — `entry` and `project` covering the same set, so reachability from an entry point is satisfied trivially by every file.

This is filed beside the standing finding rather than instead of it, and what it adds is the size. That one reads as a defect in one package's configuration, which invites a one-package repair. The population is three quarters of everything configured, so the repair is to the convention rather than to an entry, and a reader who fixes `packages/infra/scripts` and moves on has closed under one percent of it.

Raised by an archivist seat emptying `dirty/questions/code-repo-mirror-queries.md`, which found `createCountPipeline` exported from no barrel and called only from its own unit test — invisible for exactly this reason, and filed at `pages/finding/pages-system/count-pipeline-reached-only-from-a-test.finding.md`. That seat reported the general count as 135 across 379 workspaces; the figures above are what this repository holds and supersede those.

`domains/instrument.md` carries Population, which refuses a run that could not look at its cohort. This check does look, and cannot find, which is the harder case: nothing in its output distinguishes a workspace with no dead exports from one where a dead export is unspellable.

Not judged: whether the entry globs are wrong, or right for a library package and wrong for an application, or whether the check should refuse a configuration whose `entry` and `project` cover the same set.
