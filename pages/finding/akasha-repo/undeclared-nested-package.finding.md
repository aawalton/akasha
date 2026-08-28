---
id: 9d1e2257-85fd-599a-accb-a6d08a0ab9ed
slug: undeclared-nested-package
page-type-slug: finding
title: "Undeclared nested package"
domain-slug: repo/akasha-repo
---

# Claim

Fifteen git-tracked source files stand in a directory on no workspace list, and the gate built to catch that is green. `alanwalton/web/app-capacitor` carries its own `tsconfig.json`, a `package.json` with no `name`, and 15 tracked `.ts` / `.tsx` files, and the root `package.json#workspaces` does not cover it. `check-no-orphan-source` cannot see it: it is nested inside the declared workspace `alanwalton/web`, a path-prefix of all fifteen. Every per-workspace instrument reads a list it is not on.

# Evidence

Read and run against the code repo's working tree at `383bf60d35`, 2026-08-07.

The root `package.json#workspaces` array holds 350 entries, 3 of them depth-1 globs, expanding to 379 directories. Walking `packages/` for any directory carrying a `package.json` and comparing turns up five outside that set: `packages/alanwalton/web/app-capacitor`, `packages/alanwalton/native-shell`, `packages/alanwalton/atlas/native-shell`, `packages/shared/dotfiles`, `packages/smilingjenny/native-shell`. Counting git-tracked files with a recognized source extension under each — `.ts`, `.tsx`, `.lua`, minus `.d.ts` and `.generated.ts(x)` — gives 0, 0, 0, 0 and 15. Only `app-capacitor` holds source, and it is the only one of the five nested inside a declared workspace.

`bun infra/cluster-checks/src/checks/check-no-orphan-source.ts` prints "Every recognized source file under packages/ is owned by a workspace" over 16777 of 16777 git-tracked files.

The mechanism is one line. `findOrphanSources` in `infra/cluster-checks/src/lib/orphan-source.ts` skips a file where `isOwnedByWorkspace` holds, and that is `workspaceDirs.some((dir) => rel.startsWith(dir + "/"))` — any workspace directory that is a prefix, not the nearest. The check's header says it has no allowlist and ships green with zero carve-outs, which is true and is what makes the green read as coverage.

The parent does not compile them either. Workspace tsconfigs pin `include` to `["src/**/*.ts"]` or that with `.tsx`, and `app-capacitor` sits beside `packages/alanwalton/web/src/` rather than inside it. `check-tsconfig` never opens the `tsconfig.json` it carries, because `listWorkspaceDirs` never enumerates the directory.

Found ingesting a quarantined instructions document whose statement of the shape goes with it. Whether `app-capacitor` should be declared, folded or deleted is not what this observes.
