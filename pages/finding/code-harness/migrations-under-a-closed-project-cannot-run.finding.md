---
id: f9e8d90c-c76a-58b7-9e85-56af415bc160
page-type-slug: finding
title: "Migrations under a closed project cannot run"
domain-slug: domain/global
---

# Claim

`ops migration run` resolves a project worktree before it reaches psql, so every migration filed under a project whose worktree is gone refuses without applying anything. Four migrations stand blocked behind one such project today.

# Evidence

Measured 2026-08-20, during the move of every page type onto files.

`ops migration run` refused migration 5622 with `Worktree directory does not exist: /var/home/walton/worktrees/19434 — the worktree may have been removed`. The resolution happens before psql, so nothing was half-applied and the document stayed `pending`.

Project 19434 has neither a worktree under `/var/home/walton/worktrees/` nor a `project-19434` branch in the code repository. Thirty-two other worktrees stand, so the directory itself is healthy; this one project's is gone.

Behind that refusal: 5616, 5617 and 5618 stand `failed`, and 5619 stands `pending`. All four are filed under project 19434 and all four concern Alan's body readings and the persona points written from them. Every one of them was blocked at the same step rather than by anything in its own SQL.

`applyMigrationBySeq` reaches the database without resolving a worktree, and runs the same pre-apply checks, the same stale-live-base gate, the same `psql -v ON_ERROR_STOP=1` and the same PostgREST reload. Migration 5622 was applied that way and verified by count: the `pages_anon_app_select` policy went from one row to zero in `pg_policies`, and `pages` now carries no `anon` policy at all.

So the check that refuses is the worktree resolution alone, and the apply path beneath it is sound.
