---
id: ee1eebeb-9ac1-5885-b61e-a7bb80d340f3
slug: mirror-name-unlinked
page-type-slug: finding
title: "Mirror name unlinked"
domain-slug: domain/pages-system
---

# Claim

The directory name `.pages-mirror` is spelled three times in the code repository with nothing linking the spellings, so renaming the mirror silently un-excludes it from both markdown scanners that skip it. `render.ts:17` declares it as `MIRROR_ROOT`; `classify.ts:25` and `citation-carriers.ts:73` each carry it as a bare literal. Nothing fails on a rename — both skip sets simply point at a directory that no longer exists, and each scanner starts counting projected pages as repository source.

# Evidence

`rg -n '"\.pages-mirror"' --glob '*.ts'` over the code repository returns exactly three sites: the declaration `export const MIRROR_ROOT = ".pages-mirror"` at `packages/shared/pages/fs-projector/src/render.ts:17`, and two bare literals — `packages/infra/scripts/src/docs-validator/classify.ts:25` inside `IGNORE_DIRS`, and `packages/infra/checks/src/lib/citation-carriers.ts:73` inside `SKIP_DIRS`.

Neither scanner imports `MIRROR_ROOT`. `classify.ts` imports only `basename` from `node:path`. `citation-carriers.ts` builds `SKIP_DIRS` as a `new Set([...])` of literals alongside `node_modules`, `.git`, `dist`, `.next`, `.turbo`, `.cache`, `build`, `coverage`, `__fixtures__`, `generated` and `_generated`.

Both exclude by exact directory name rather than by a leading dot, so the dot is not what protects them: `classify.ts` tests `relPath.startsWith(d + "/") || relPath.includes("/" + d + "/")` against `IGNORE_DIRS`, and `citation-carriers.ts` tests `SKIP_DIRS.has(entry.name)` on descent. `packages/shared/worker-supervisor/src/discovery.ts` does skip on `entry.name.startsWith(".")`, which is what the contrast looks like.

The cost of the mirror going unexcluded is measured in `classify.ts`'s own comment: unexcluded, `.pages-mirror` and the vendored Python trees were 72 of the 143 files that scan reached.

Found while ingesting `dirty/knowledge/pages-filesystem-mirror.md`, whose prose account of this arrangement had itself drifted: it named three scanners in three packages, one of which — `packages/agents/instructions/src/lib/routing-corpus.ts` — no longer exists anywhere in the repository, and one of which had since been renamed from `principle-citation-carriers.ts`. That the description went stale with nothing reporting it is the same gap seen from the other side.
