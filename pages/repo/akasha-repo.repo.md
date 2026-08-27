---
id: b8152699-76bf-4933-ab6b-2dd8cc881a3b
page-type-slug: repo
title: "Akasha repo"
slug: akasha-repo
domain-parent-slug: page-type/repo
---

# Definition

- **Akasha repo** — the repository nothing tracked is outside.

# Intent

No file here imports a file in another repository, apart from a type declaration.

# Rules

## Atomic Commit

**Stage and commit in one command, naming the paths that commit is for.**

A parent's worktree is shared by every child, so anything staged and not committed is swept up.

Never reach for `-a` to make it one command.

Name the files, never a directory that may grow.

## Root Typecheck

**Typecheck with the root `typecheck` script, and a deployed app from its own directory.**

The root script builds only its referenced projects, so an app outside them reads green unchecked.

Never add a tsconfig to make a bare call work.

A deployed app runs typegen before the compiler.
