---
id: f9a41c23-f689-5b14-baa2-8c997265593b
page-type-slug: finding
title: "Test fixture repos uncovered"
domain-slug: domain/global
---

# Claim

1,337 standalone git repos under `/tmp` (98,785 inodes, 54% of the 182,308 IUsed measured, all bearing the same day's date and regenerating per test run) are dep-graph and dockerfile-recipe test-fixture repos created by `git init` inside test suites, a class of inode consumption distinct from and uncovered by the worktree-doctrine rows (#16069/#16072/#16193) that instead cover the one real linked worktree (20,104 inodes, 11%).

# Evidence

Project #16231, domain `code-harness`, `someday_maybe`. Measured 2026-07-25 by aine.

Correct classification (the first pass used `[ -e $d/.git ]`, which matches a `.git` file and a `.git` directory — a superset, and published "1,338 worktrees" was wrong):

    .git is a FILE  -> LINKED WORKTREE     count = 1      inodes = 20,104   (only /tmp/check-15957)
    .git is a DIR   -> STANDALONE REPO     count = 1,337  inodes = 98,785
    /tmp: tmpfs, 1,048,576 inode cap

Composition of /tmp (182,308 IUsed after athena removed one worktree):

    98,785  1,337 standalone test-fixture repos   54%   <- this row; no other row covers it
    22,400  claude-1000/ agent session scratch    12%
    20,104  check-15957/ the one real worktree    11%   <- what #16069/#16072/#16193 all cover
     4,752  loose check-*.log debris back to Jul 19

By prefix: dep-graph-css-producer 198, dep-graph-yaml-producer 110, dep-graph-cli 99, dep-graph-yaml-discover 90, dep-graph-md-producer 90, dep-graph-rbac-discover 66, dep-graph-dockerfile-producer 63, dep-graph-sql-discover 60, dockerfile-recipe-producer 54, dep-graph-sql/sh-producer 50 each, ... ~59-74 inodes each.

All 400 sampled repos carried today's date (2026-07-25) — recurring (regenerates per test run), not residue.

Why it matters: #16069/#16072/#16193, three rows by three owners for the same worktree-doctrine defect, cover 11% of inodes (#16193 landed by filing). Nothing covered the 54%. A doctrine clause cannot reach it — no agent reads CLAUDE.md when a test fixture calls `git init`.

First cheap test proposed, not run by anyone at filing: record `df -i /tmp` before and after one dep-graph suite run — measures the per-run leak rate and is called the only proposed mechanism whose arithmetic can reach the 1M cap (six worktrees at 20k is 12% of a cap sitting at 20% used, and cannot).

Not established: that this caused the fleet-wide ENOSPC. Stated as a candidate with closing arithmetic, not a conclusion.
