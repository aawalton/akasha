---
id: a3ecf2b4-7ab5-5da4-8f64-ee2f61ce607b
page-type-slug: finding
title: "Stale out dir fails agents suite"
domain-slug: repo/code-repo
---

# Claim

Stale compiled test files in an untracked `out/` directory in the shared `~/code` checkout make
`bun test packages/agents` report three failures there that do not exist in the repository.

# Evidence

Measured on 2026-08-12 against `~/code` at `325e418834`, and against a fresh worktree of that same SHA.

`bun test packages/agents` in `~/code` reports 5860 pass, 3 fail, 5866 tests across 461 files, and exits
1. The same command in a fresh worktree of the identical commit reports 5823 pass, 0 fail, 5826 tests
across 459 files. The three failures are `column project-count slots — each column sums the buckets its
tracks were given` and two cases in `each stoplights group renders its OWN read`.

The difference is two files. `packages/agents/vscode-extension/out/` exists only in `~/code`, is matched
by that package's own `.gitignore`, is untracked, and its contents are dated 2026-08-04. It holds
`features/status-bar/slots.unit.test.js` and `features/status-bar/render.unit.test.js`, compiled from an
older revision of the two sources beside them. `bun test` discovers both as test files, so the run picks
up 13 files under that package where the tree holds 11.

Both source files pass in isolation in both checkouts: `bun test
packages/agents/vscode-extension/src/features/status-bar/` reports 45 pass, 0 fail, 3 files, exit 0 in
each. The failures are the stale compiled copies alone.

Every seat that runs the agents suite against `~/code` reads three failures that no commit introduced and
that no branch can fix, and a seat comparing its own branch against main reads its branch as having
repaired something.
