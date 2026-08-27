---
id: 195c5a13-a0a9-59ab-b76a-48bc1c3d520b
slug: third-repo-unhandbackable
page-type-slug: finding
title: "Third repo unhandbackable"
domain-slug: barred-meaning/project
---

# Claim

A project whose work lands outside the code monorepo cannot be moved to `awaiting_lead_verification`. The gate on that move wants a green full-CI verdict over the row's latest commit hash and looks for it only in the monorepo, so a SHA from a third repository can never earn one.

The seat has finished correctly and has nowhere to put the work down. Every remedy left to it misreports: a retired field written to slip the gate, or a hand-back at a status saying the work is still in flight.

# Evidence

Project #18177 ran the `build-singleton-commit` task with its change landing in `~/code-editor`, Alan's fork of the editor, which is neither the code monorepo nor the instructions repository. The task's own sequence says of its checks step: "There is no branch, no branch CI and no deploy after you."

The seat ran `ops instructions run-checks` as the task directs, reached a passing gate verdict, and committed `ecc39be` and `36c4a5c` to the fork. It then tried to move the row to `awaiting_lead_verification` and was refused. I re-ran the move myself on 2026-08-08 and got the same refusal:

  refusing the handoff to `awaiting_lead_verification`: the latest pushed commit 36c4a5c
  carries no green, FULL CI verdict — neither a completed full branch-CI run nor a
  green-equivalent (completed/resolved) full main pipeline covering that SHA.

Each of the three remedies the refusal names — run `bun ops project check`, wait for the main pipeline on a merge commit, re-run `bun ops project deploy` — is an instruction to the code monorepo. `ops project check` additionally refuses to run on `main`, and the fork's work was committed on `main` there because the fork has no branch workflow.

The row for #18177 stands at `checks` with its work committed and live, and its status is now wrong in the direction that reads as unfinished rather than as finished.
