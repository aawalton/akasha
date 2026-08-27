---
id: 74b486c9-efb9-57ee-a285-e293890b8f75
slug: rebase-orphans-commit-hashes
page-type-slug: finding
title: "Project rebase leaves commit-hashes pointing at commits the rebase orphaned"
domain-slug: domain/work-system
---

# Claim

`ops project rebase` leaves a project's `commit-hashes` pointing at commits the rebase orphaned, though it names reconciling them as part of what it does.

# Evidence

Project 19419's worktree was rebased onto `origin/main` on 2026-08-18 with `ops project rebase 19419`. It reported `rebased: 49 file(s) changed (uncommitted drift: bun.lock)` and said nothing about commit hashes.

All eight hashes then on `memory/projects/19419.md` were orphaned by the replay. `git merge-base --is-ancestor 45a0f9d97866e89560b2d0e1e2793e630b8ae615 HEAD` exits non-zero against the rebased branch, as does the same test on `92aad683d78b4342310ed5e20d1fd102cf5baa51`; the replayed commits carry the same messages under new hashes, `86e72400ddec0bbe1ba47beaab0aa48cfa59a9f9` through `fec1ebc4b7509190bb3286d7063a52cda83bafa6`. They were repaired by hand.

`tools/commands/project/rebase.ts` names `packages/alanwalton/projects/cli/src/lib/reconcile-rebased-commit-hashes.ts` in a `RECONCILE` constant and its help says a clean rebase runs the same post-replay tail as `sync`. Whether that step ran and found nothing, or did not run, is not established here — what is established is that the page was left wrong and that the command's own output gave no sign of it.

A wrong hash here reads exactly like a right one: it is a hex string on a page, and nothing resolves it until somebody tries to. Every project rebased before this one carries the same risk.
