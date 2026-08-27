---
id: e23c1da7-9c82-58c3-ab64-cb8afe23556c
slug: worktree-root-bun-test-false-red
page-type-slug: finding
title: "Worktree root bun test false red"
domain-slug: domain/global
---

# Claim

`bun test` run from the worktree root exits 99 on a fully passing suite because Bun reads bunfig.toml from the current directory only, so the root bunfig loads instead of the package's, the package's preload/teardown never runs, and the suite reports 0 failures with exit 99 — a false RED on the exact invocation agents are instructed to use.

# Evidence

Mechanism: `bun test` from the worktree root exits 99 on a fully passing run because Bun reads bunfig.toml from the current directory only. Running `bun test packages/<pkg>/...` from the repo root loads the root bunfig, so the package bunfig's preload (supabase-test-harness teardown) never runs, the shared PGlite teardown never fires, and Bun exits 99 despite 0 failures. Re-running from the package directory gives exit 0 on the identical suite.

Observed by worker-16243 on the orchestrator suite: 618 pass/0 fail/exit 99 from the worktree root; 618 pass/0 fail/exit 0 from the package directory. It bisected every subtree (reaper, reactors, main-pipeline-creator, dispatcher), all exiting 99 with zero failures, one step from reporting a package-wide harness defect that doesn't exist.

Worse than #16298's rest: every other instrument found 2026-07-25 was a false GREEN; this is a false RED on correct code, on the invocation agents are told to use — the standing pattern `cd ~/projects/{seq}/worktree && ...` is the repo root, so the documented workflow gets exit 99 on every passing run in any pglite-harness package.

A false green costs one missed defect; a habitual false red costs the signal itself: an agent meeting exit 99 on passing tests learns to disregard `bun test`'s exit code, so a real failure exits non-zero into a trained blind spot.

The package bunfig already documents the 99/100 exit behavior in a comment, unreachable from where agents stand when running the command. A fix making the correct invocation the default, or the wrong one fail loudly, beats documenting the trap harder.

Reported by worker-16243 while holding a row in flight; declined to file inline, the right call. Sibling of #16296 (check-timeout conflation), #16293 (exit-code mismatch), #16302 (typecheck blind to tests); class row #16298.

Project #16309, someday_maybe, domain code-harness. Captured, never formally defined; moved here off the row's retired `notes` attribute on 2026-08-15.
