---
id: 1f6e0dd6-15a9-5f35-88a4-ab9e2fbcec84
page-type-slug: finding
title: "A stale declaration file is read as the API"
domain-slug: domain/code-quality
---

# Claim

A `.d.ts` under a `dist/` directory is read as what a package exports. Three stale ones misled readers in a single night, each sending someone to a wrong conclusion about what code exists.

They are untracked and not ignored, so they do appear in `git status`. That did not help. Nobody consults `git status` before reading a declaration file, and a stale `.d.ts` carries nothing on its face saying when it was written or whether its source still stands.

# Evidence

Observed 2026-08-27 into 2026-08-28 across seats astra, thea and amy, and their agents.

**`shared/status-bar-access/dist/page/page-seq.d.ts:9` declares `takeSeqOf` from `page/page-seq.ts`.** That allocator was removed hours earlier, at `3f4e32f3a` and `3282f72ed`. The declaration outlived the code it described.

**`shared/status-bar-access/dist/tools/lib/page-derive.d.ts` made `tools/` look typechecked.** The project lists 432 files, none of them under `tools/`; the artifact's presence in `dist` suggested coverage that does not exist. An agent probed all 52 referenced projects with `--listFilesOnly` to establish that zero include `tools/lib/page-derive.ts`.

**`shared/pages-access/dist/` still claimed exports after `shared/pages-access/src/index.ts` ceased to exist**, so a survey of what a package offers overstated it.

Two properties make these hard to catch. They are untracked, so a search over tracked files does not reach them. And they are generated, so nothing about a stale one differs in appearance from a current one.

Not measured: how many `dist` roots hold declarations whose source has moved, or what last wrote each. Eleven other `dist` roots stand in the tree unexamined.

# Bearing

`.gitignore` here is four lines, all `*.uncommitted.*` and `*.lock/`. Build output is deliberately left visible rather than ignored. This finding is not an argument for ignoring it — that would hide these three rather than reveal them. It records that visibility in `git status` is not the surface on which a declaration file is read, so the current arrangement does not prevent the fault it appears designed to prevent.
