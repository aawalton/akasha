---
id: ef6ef44c-e375-5d63-9f18-ffbe410ed393
page-type-slug: finding
title: "Project start worktrees the monorepo regardless of domain"
domain-slug: barred-meaning/project
---

# Claim

`ops project start` makes a worktree of the `code` monorepo for every project, including one whose domain names a different repository — so a project on the `code-editor` domain gets an empty checkout of the wrong tree, standing beside the worktree its seat actually made and works in.

# Evidence

Project #18466 declares `domain: code-editor` and its work is in `~/code-editor`, a separate repository. `ops project start --seq 18466` left a worktree of the `code` monorepo at `~/worktrees/18466`, on branch `project-18466` at `d5fe214b26`. The seat did its work in `~/worktrees/18466-editor`, which it made itself off `~/code-editor`.

Measured after the project was verified: `git status --porcelain` in `~/worktrees/18466` returns nothing and its HEAD is the branch point, so nothing was ever done in it. `git worktree list` in `~/code` still lists it, which is why the seat left it standing rather than removing a checkout the row records.

NOT MEASURED: whether this happens for every `code-editor` project or only where some other condition held — one occurrence was observed. Nor whether `ops project start` has any route to a repository other than the monorepo, which would make this a missing argument rather than a fixed assumption. Nor what, if anything, later reads the recorded branch and would be harmed by removing the worktree.

The cost seen here is small and is not disk: a seat arriving on a code-editor project meets two worktrees named for the same project, one of which is the wrong repository, and choosing the wrong one is a whole run.
