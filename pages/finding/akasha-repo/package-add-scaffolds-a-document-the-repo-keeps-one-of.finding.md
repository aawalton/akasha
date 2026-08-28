---
page-type-slug: finding
slug: package-add-scaffolds-a-document-the-repo-keeps-one-of
title: "ops package add writes a CLAUDE.md into every new package, and the repository tracks one"
domain-slug: repo/akasha-repo
---

# Claim

`ops package add` writes a `CLAUDE.md` into every package it scaffolds, and this repository tracks one `CLAUDE.md` in total.

# Evidence

Measured 2026-08-28 at `c4664f128a`.

THE WRITE IS UNCONDITIONAL. `infra/workspace-cli/src/lib/package-add/run.ts:49` reads `writeText(root, join(add.path, "CLAUDE.md"), buildClaudeMd(name))`. It sits between the `package.json` write at :48 and the workspaces append at :51, on no branch and behind no flag.

WHAT IT WRITES IS TWO TODOS. `buildClaudeMd` at `infra/workspace-cli/src/lib/package-add/derive.ts:64` returns frontmatter carrying `description: <name> — TODO: describe this package's purpose and what it owns.`, an `# <name>` heading, and the line `TODO: document this package.` Nothing else. It is exercised at `infra/workspace-cli/src/lib/package-add/derive.unit.test.ts:94`.

THE COMMAND ADVERTISES IT IN ITS OWN SUMMARY. `tools/commands/package/add.ts:1` — `export const summary = "Scaffold a new workspace package (dir + package.json + CLAUDE.md, wired into workspaces)"`.

IT IS REACHABLE. `declaredCommands()` from `tools/ops/declared.ts` returns `package add` and `package move` under that namespace.

AGAINST ONE TRACKED DOCUMENT. `git ls-tree -r --name-only c4664f128a` matching `CLAUDE.md` returns one path, `infra/eso-rig/CLAUDE.md`.

THE ABSENCE IS NOT AN ARTEFACT OF IGNORING. `git check-ignore -v` matches neither `dotfiles/CLAUDE.md` nor `temper/game-items-rules-core/CLAUDE.md`, and `git status --porcelain --ignored` shows no untracked `CLAUDE.md` anywhere on disk.

Not measured: whether the `CLAUDE.md` documents were removed by a decision or went incidentally with the `packages/` tree.

Not measured: whether the agent harness reads a package-level `CLAUDE.md` in this layout. A `CLAUDE.md` is read by the harness rather than by code here, so "nothing reads it" is not established and is not claimed.
