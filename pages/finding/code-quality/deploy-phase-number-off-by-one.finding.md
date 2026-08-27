---
id: 49032c3e-9419-50d1-9796-2d546d02b9e3
slug: deploy-phase-number-off-by-one
page-type-slug: finding
title: "Deploy phase number off by one"
domain-slug: domain/code-quality
---

# Claim

`move-to-vscode-extension.ts`'s module docblock puts the extension install at deploy phase `[6/N]`; the live label in `move-to-deploy-helpers.ts` is `[5/7] postLandReconcile install`, so the number is wrong by one.

# Evidence

Found on 2026-08-07 while emptying `dirty/skills/alan-harness/findings.md`, which recorded the same drift on 2026-07-28. That document is queued for removal, so the observation is filed here to outlive it. Both readings were re-taken against `~/code` rather than carried over.

`packages/alanwalton/projects/cli/src/lib/move-to-vscode-extension.ts` line 24: "`[2/N]`. Spawns `bun run compile` inside the project worktree's". Line 32: "`installVscodeExtension(worktreeDir)` runs post-push at phase `[6/N]`".

`packages/alanwalton/projects/cli/src/lib/move-to-deploy-helpers.ts` line 109: "[2/7] build-only fan-out: run every pre-push fail-fast build check that". Line 139: "[5/7] postLandReconcile install fan-out (called from `postLandReconcile`): run every".

So the build phase agrees and the install phase does not: the docblock says six of an unstated total where the helper says five of seven.

Not established: which side should move. The docblock spells its total as `N` rather than `7`, so it may have been written deliberately against a pipeline whose length was expected to change, and a phase was added or removed between the two files without the docblock following. Only the owner of `packages/alanwalton/projects/cli` can say.

Not repaired here. `domains/role.md` **Adjacent Repair** would have this landed by whoever finds it, but `domains/folders/code-repo.md` **Read-Only Main** forbids writing into `~/code` at all, and a code change belongs in a worktree behind the code gates rather than in an archivist's ingest run.
