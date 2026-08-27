---
id: eef49b84-5f58-5d13-b50c-8c3656b51a3c
page-type-slug: repo
title: "Code repo"
slug: code-repo
domain-parent-slug: page-type/repo
---

# Definition

- **Code repo** — the monorepo holding the products, the agent runtime and the infrastructure.

# Design

Nothing under `.claude` is tracked here.

A test stands in the repo of the code it tests.

A test asserting what the Lua compiler emits stands in the instructions repo, not beside the source it compiles.

# Intent

The code repo contains no unused code.

Domain logic stands in a package of its own domain, unaware of any command that calls it.

# Rules

## Land On Main

**Commit a code change straight onto main in `~/repos/code`; take no branch and no worktree.**

Nothing outside akasha merges a branch, so a change left on one is stranded.

Every seat reads that checkout as you write.

A scratch file you delete is still a write.

## Atomic Commit

**Stage and commit in one command, naming the paths that commit is for.**

A parent's worktree is shared by every child, so anything staged and not committed is swept up.

Never reach for `-a` to make it one command.

Name the files, never a directory that may grow.

## Root Typecheck

**Typecheck the code repo with its `typecheck` script, and a deployed app from its own directory.**

The root script builds only its referenced projects, so an app outside them reads green unchecked.

Never add a tsconfig to make a bare call work.

A deployed app runs typegen before the compiler.
