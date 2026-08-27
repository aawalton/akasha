---
id: 196e0d02-b036-542f-9e87-f2e32caf3132
slug: shared-index-deadlocks-after-failed-commit
page-type-slug: finding
title: "Shared index deadlocks after failed commit"
domain-slug: domain/global
---

# Claim

A failed `ops project commit --path` leaves its declared paths staged, and in a worktree shared by several seats that index can grow past any one seat's ownership — at which point every `--path` commit on the tree refuses, and no command a seat is permitted to run will unstage.

# Evidence

Found 2026-08-11 by #18771 in `/home/walton/worktrees/18768`, where eight children work in one worktree. The verb stages, then runs biome; a lint failure aborts after the staging stands. Measured at 12:40 the index held 19 staged paths across at least three children's surfaces.

`commit.ts:161` refuses on any staged path outside `--path`, and the refusal is total, so each seat is blocked by the others' leftovers and none can drain its own. The verb's `--help` names the remedy as `git reset HEAD --`; `git reset`, `git restore --staged` and `git rm` are all prohibited by the bash guard, and `git restore --staged` unstages without touching a working tree, so the guard's stated warrant — "destroys path-level changes in a worktree shared by other agents" — is true of a different form of the command than the one it blocks.

What the error message offers instead is `--path` over the foreign paths or `--all`. Both commit another seat's work in progress under the committing seat's name, and `--all` sweeps unstaged mid-edit files as well.

It drained at 12:42 when one seat declared the whole set (`3fa0948bb6`). `--all` drains it too and takes strictly more. Either exit writes one seat's name over several seats' work, so what makes it survivable is a step neither command performs: that seat had asked the owners whose each path was, and could say so in the message. Without it the exit is the same command and a false history. The trap re-arms on the next lint failure.
