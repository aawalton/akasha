---
id: 9c1b1038-ba75-5a31-862d-bd9ad743b0b5
slug: docker-copy-paths-are-build-context-paths
page-type-slug: finding
title: "A Dockerfile COPY path is a build-context path, so both the old spelling and the repointed one are broken after a cross-repository move"
domain-slug: domain/ops-package
---

# Claim

`COPY --link packages/.../package.json` names a build context, not a repository. Once the package has left, the old path is broken and the repointed one is broken too, the new repository not being that build context — both answers are wrong and only one of them looks handled. Regenerating alone does not fix it either, because the generator re-emits a context path for a package that has gone.

# Evidence

Observed 2026-08 in a dry-run cross-repo move out of `code`.

`generate-dockerfiles-deps.ts:56` calls `listWorkspaceDirs(ROOT)`, so the generators read the `workspaces` array. Once a move maintains that array, a regenerated Dockerfile stops naming the departed package at all. The order is therefore forced: the workspaces array first, the generators second. That is migration work rather than repoint work.

The array is untouched by a move on its own. After the dry run `code/package.json:67` still carried the moved directory and akasha's manifest never gained it, because the mention scanner matches file paths rather than the bare directory a manifest names. `workspace-package/workspaces-array.ts` was written for exactly that.

Not measured: which other generated artifacts in `code` carry build-context paths rather than repository paths. The Dockerfiles were found because the repointer touched them; nothing swept for the class.
