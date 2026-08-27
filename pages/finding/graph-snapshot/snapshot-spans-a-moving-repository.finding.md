---
id: 2ecf3300-fce6-565d-a759-82a88dbb99ed
slug: snapshot-spans-a-moving-repository
page-type-slug: finding
title: "Snapshot spans a moving repository"
domain-slug: domain/graph-snapshot
---

# Claim

Nothing holds a repository still while a snapshot is built, so one snapshot can mix two states of the same repository and nothing about it says so.

# Evidence

Measured 2026-08-21, while porting `graph-core` into the instructions repository.

Paths are enumerated once. `packages/shared/graph/producers/src/lib/discover-repo-files.ts` runs `git ls-files --cached --others --exclude-standard -z` and caches the result in a `WeakMap` keyed by the build context, so every producer sharing that context sees one list.

Contents are not. 25 producer modules read file contents from disk themselves, found by searching the producer tree for `readFile`, `Bun.file` and `readFileSync` outside test files. `packages/shared/graph/core/src/registry/producer-run.ts` runs producers in tiers, each tier awaiting the one before it, so those reads happen at later moments than the enumeration and at different moments from each other.

The window is not idle. Every gated write in the instructions repository commits and pushes, so its HEAD moves whenever any seat lands a change, including while a build runs.

Counted at the time of writing, with `git ls-files --cached --others --exclude-standard` and `git status --porcelain`: instructions 11,200 paths and 1 uncommitted, code 13,274 and 1, memory 23,047 and 60. The uncommitted counts matter because the enumeration includes untracked files, so a snapshot reflects the working tree rather than any commit.

`domains/graph-snapshot.md` states that two snapshots at one commit differ where another repository moved between them. That covers movement between snapshots. It says nothing about movement inside one.

Not measured: how long a full build runs, so the width of the window is unknown. Not measured: whether any snapshot has actually spanned a change.
