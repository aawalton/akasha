---
page-type-slug: finding
slug: package-add-scaffolds-a-document-the-repo-keeps-one-of
title: "ops package add writes a CLAUDE.md into every new package, and the repository tracks one"
domain-slug: repo/akasha-repo
---

# Claim

`ops package add` writes a `CLAUDE.md` into every package it scaffolds, and this repository tracks one `CLAUDE.md` in total. The generator is live in the command registry, so every package added from here on starts with a file of a kind nothing here retains.

What it writes is a placeholder rather than a document: a `description:` line and a body, both reading `TODO`. Nothing about what a `CLAUDE.md` was for survives in the generator, so removing it would lose no record of the document it makes — which is the usual reason to keep an old version until its replacement is done.

The bound that decides this: a `CLAUDE.md` is read by the agent harness rather than by code in this repository, so "nothing reads it" is not established here and is not claimed. What is established is that the repository does not KEEP what this command writes.

# Evidence

Measured 2026-08-28 at `c4664f128a`.

THE WRITE IS UNCONDITIONAL. `infra/workspace-cli/src/lib/package-add/run.ts:49` reads `writeText(root, join(add.path, "CLAUDE.md"), buildClaudeMd(name))`. It sits between the `package.json` write at :48 and the workspaces append at :51, on no branch and behind no flag.

WHAT IT WRITES IS TWO TODOS. `buildClaudeMd` at `infra/workspace-cli/src/lib/package-add/derive.ts:64` returns frontmatter carrying `description: <name> — TODO: describe this package's purpose and what it owns.`, an `# <name>` heading, and the line `TODO: document this package.` Nothing else. It is exercised at `infra/workspace-cli/src/lib/package-add/derive.unit.test.ts:94`, so the placeholder is under test.

THE COMMAND ADVERTISES IT IN ITS OWN SUMMARY. `tools/commands/package/add.ts:1` — `export const summary = "Scaffold a new workspace package (dir + package.json + CLAUDE.md, wired into workspaces)"`.

IT IS REACHABLE. `declaredCommands()` from `tools/ops/declared.ts` returns `package add` and `package move` under that namespace, so this is a live command rather than code nothing calls.

AGAINST ONE TRACKED DOCUMENT. `git ls-tree -r --name-only c4664f128a` matching `CLAUDE.md` returns one path, `infra/eso-rig/CLAUDE.md`.

THE ABSENCE IS NOT AN ARTEFACT OF IGNORING. `git check-ignore -v` matches neither `dotfiles/CLAUDE.md` nor `temper/game-items-rules-core/CLAUDE.md`, and `git status --porcelain --ignored` shows no untracked `CLAUDE.md` anywhere on disk. So packages do not carry one that git is merely not showing.

THE MOVE PATH CARRIES THE SAME ASSUMPTION. `infra/workspace-cli/src/lib/package-move/docs-rewrites.ts:16` still tests `path.endsWith("/CLAUDE.md") || path === "CLAUDE.md"`, and its comment at :20 reads "Every CLAUDE.md is taken separately by listTargetDocs, wherever it sits" — rewriting machinery for a population of one.

WHY THIS IS FILED APART FROM THE POINTER CENSUS. `claude-md-pointers-outlive-their-targets` counts sixteen comments naming a `CLAUDE.md` that is not there. This is the other end: not debris but the machine still making it. The two would be repaired by different acts and one does not imply the other.

Not measured, and load-bearing: whether the `CLAUDE.md` documents were removed by a decision or went incidentally with the `packages/` tree. Nothing here establishes that the repository decided against the document type rather than losing it, and a scaffolder for a type Alan still wants is a different thing entirely.

Not measured: whether the agent harness reads a package-level `CLAUDE.md` in this repository's layout, so the file this command writes may have a consumer outside the repository even with nothing here tracking it. That question decides whether the right act is deleting the scaffolder or restoring the documents, and this finding chooses neither.
