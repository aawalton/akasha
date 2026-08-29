---
id: b8152699-76bf-4933-ab6b-2dd8cc881a3b
page-type-slug: repo
title: "Akasha repo"
slug: akasha-repo
domain-parent-slug: page-type/repo
---

# Definition

- **Akasha repo** — the repository nothing tracked is outside.

# Design

Nothing under `.claude` is tracked here.

This repository has one master instance; every other copy is a backup or read-only.

# Intent

No file here imports a file in another repository, apart from a type declaration.

This repository contains no unused code.

Domain logic lives in a package of its own domain, unaware of any command that calls it.

Every third-party package this repo uses is declared.

# Rules

## Atomic Commit

**Stage and commit in one command, naming the paths that commit is for.**

A parent's worktree is shared by every child, so anything staged and not committed is swept up.

Never reach for `-a` to make it one command.

Name the files, never a directory that may grow.

## Right Version

**Check a claim about a file against the version it was made about, not the one on disk now.**

A file carries no time, so the wrong version answers as confidently as the right one.

`git show <commit>:<path>` when numbers disagree.

Treat a small unexplained gap as the file moving.

