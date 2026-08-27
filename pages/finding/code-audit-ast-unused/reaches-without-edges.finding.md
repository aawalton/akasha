---
id: 81e31acd-f17f-5a34-ba18-2c2ae072f567
slug: reaches-without-edges
page-type-slug: finding
title: "Three kinds of live reach are invisible to the ast-unused audit and each reads as a dead export"
domain-slug: domain/code-audit-ast-unused
---

# Claim

Three kinds of live reach into the code repository are invisible to `ops audit ast-unused`, and each reads exactly like a dead export.

# Evidence

Taken while working the 77 findings the audit reported on the project-19419 worktree.

A repository it does not measure. `~/code-editor` resolves `@shared/*` through a node_modules symlink into `~/code`, so `extensions/ops/src/features/status-bar/readers.ts` and `slots.ts` import `foldProjectProgress` and `ProjectCountColumn` from `@shared/status-bar-access`. Both were reported unreached. Some symbols there already carried `ast-unused: keep` naming those exact editor files, so this had been hit before and answered per symbol; `foldProjectProgress` carried no annotation.

A script invoked as a shell string. `packages/infra/ci/workflows/src/prep-cache-steps.ts` lines 66 and 78 run `bun packages/infra/checks/src/trees/acquire-instructions-tree.ts` and `acquire-books-tree.ts` before every CI pipeline. `packages/infra/checks` declared no entry glob covering `src/trees/`, so the audit started from nothing reaching them and reported their whole chain unreached: `cloneBooks`, and `acquireInto`, `AcquisitionOutcome`, `BOOKS_CACHE_DIR`, `booksTreePath`, `recordedSha` across `books-tree.ts` and `instructions-tree.ts`. Eight of the 77. Adding `src/trees/*.ts` drops all eight and reports nothing new.

A name matched as a string. `work-surfacing-needles.ts` holds `EXCLUSION_ATTRIBUTE_NAMES = ["EPHEMERAL_ATTR", "ephemeral"]`, matching the literal text of `EPHEMERAL_ATTR`. `work-surfacing-surfaces.ts` names `blocked-census-gather.ts` and `${PROJECTS_CLI}/project/census-scan.ts` as declared surfaces by path, under `DECLARED_SURFACE_FLOOR = 6`. No import carries any of these.

What the three share is a reach carrying no import edge, each found only by reading a reported symbol back to its caller by hand. Nothing in the reading separates them from the genuinely dead: 8 of 77 were the second kind, and deleting on the audit's word alone would have taken out CI cache preparation on every pipeline.

The first kind has a per-symbol answer in use and the second had a config answer. The third has neither.
