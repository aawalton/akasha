---
id: febf8950-b299-534d-b587-2dbc9c54a8e0
page-type-slug: finding
title: "Pipeline cannot deploy removal of what it builds"
domain-slug: domain/global
---

# Claim

The deploy pipeline unconditionally compiles the editor extension out of the branch it is deploying, so it cannot deploy the change that removes the extension.

# Evidence

`ops project deploy --seq 18893` failed at phase `[2/7]`, exit 2, before the push and before any queue entry was minted. Its last line was `[vscode-extension] running 'bun run compile' in /home/walton/worktrees/18893/packages/agents/vscode-extension` — a directory that branch deletes. `Bun.spawn` was handed a `cwd` that does not exist and failed `ENOENT: no such file or directory, posix_spawn 'bun'`.

It THROWS rather than returning its step, so the verdict read `the deploy pipeline threw before reporting an outcome` instead of naming `deploy_vscode_extension_build`, and the exit code was 2 (nothing established) rather than 3 (a phase failed).

The call sits in `runCompile` at `packages/alanwalton/projects/cli/src/lib/move-to-vscode-extension.ts`, reached from `buildChangedArtifactsPhase` in `move-to-deploy-helpers.ts`. That file's own comment states there is no way around it: the vscode-extension compile is ~20ms and always runs (no detection gate). There is no flag, no existence check and no try/catch.

Both ends carry it. Phase `[2/7]` builds from the feature worktree; the post-land install phase calls the same function with `GIT_REPO_DIR`, so a landed removal would break the reconcile in `~/code` the same way.

The general shape: a pipeline phase that unconditionally builds one named package cannot carry a change retiring that package, and the failure surfaces as an unclassified throw rather than as the phase that owns it.
