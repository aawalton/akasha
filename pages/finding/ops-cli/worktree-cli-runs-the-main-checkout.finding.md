---
id: c5b0d00e-bc88-5504-b564-d9308466ba52
slug: worktree-cli-runs-the-main-checkout
page-type-slug: finding
title: "Worktree CLI runs the main checkout"
domain-slug: domain/ops-cli
---

# Claim

`ops` dispatches from `/home/walton/code` whatever the working directory, so a branch's changed CLI is never exercised by typing `ops` — not from its own worktree. A flag the branch added is answered as an unknown flag, with a did-you-mean naming other commands, which is byte-identical to the answer for a flag nobody ever wrote. The seat concludes its change is absent rather than unbuilt, and the two readings have no distinguishing surface.

# Evidence

Measured 2026-08-11 on #18611. The shell resolves `ops` to `/home/walton/code/packages/shared/dotfiles/bin/ops`, an absolute path in the source-of-truth checkout, and the dispatcher resolves subcommands from its own tree. Nothing about the invocation is relative to `cwd`.

A child on `project-18611` had added `--dry-run` and `--slug` to `ops tracking recompute-totals` and reported running the fixed pass. Its manager, standing in `/var/home/walton/worktrees/18611`, ran `ops tracking recompute-totals --dry-run --json` and got `unknown flag: --dry-run (did you mean ops tracking hourly-confirm --dry-run or ...)`. That is the answer for a command whose flag does not exist. The change was in fact present and correct: invoking the worktree's own entry point, `bun /var/home/walton/worktrees/18611/packages/shared/dotfiles/bin/ops tracking recompute-totals --dry-run --json`, returned the full payload, `dryRun: true` included.

The manager was one step from recording that the worker's dry run did not exist, which would have made a sound hand-back read as a fabricated one.

The reach is wider than a CLI flag: any behaviour a branch changes behind an `ops` verb is unreachable this way. `ops project check --seq` is not a counterexample — it resolves a worktree by flag, for the tree it pushes, while still running main's code to do it. Verified present at both paths.

What makes it costly is the shape of the wrong answer. A refusal naming near-miss commands reads as an authoritative negative about the whole CLI, when the true scope is "not in the copy I ran". A silent no-op or an error mentioning the checkout would strand nobody.
