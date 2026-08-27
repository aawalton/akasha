---
id: 9792c5ab-d9fb-5455-9d02-a66727bbc735
page-type-slug: finding
title: "Two dot diff phantom deletions"
domain-slug: domain/global
---

# Claim

Two-dot `git diff origin/main..branch` reports deletions proportional to how far `origin/main` has advanced past the branch, unrelated to what the branch itself changed, because two-dot diffs the two tips rather than from the merge base — and the error only ever runs in the alarming direction (over-reporting destruction, never under-reporting it).

# Evidence

Project #16078, domain `code-harness`. Found by sophia, one step from wrongly killing a worker's correct work and reporting a rogue deletion spree. Carried no objective; notes only.

TRIGGER: `git diff --stat origin/main..project-16057` reported 71 files / 3,276 deletions against a briefed scope of 8 files / 304 deletions.

MECHANISM: two-dot `git diff A..B` is identical to `git diff A B` — it diffs the two tips. Every commit `A` has that `B` lacks renders as a deletion in `B`. On a fast-moving `origin/main` (this harness lands all night, from many agents), a branch accumulates phantom deletions proportional to how far main has advanced, unrelated to what the branch did.

REPRODUCED at ~500x scale on project-11682 (11,483 commits behind main): two-dot diff → 15,667 files / 204,042 insertions / 1,601,575 deletions; three-dot diff → empty; own-commit log → zero. A branch that changed nothing reported 1.6 million deletions.

CORRECT FORMS: `git show --stat <sha>` for one commit; three-dot `git diff <base>...<branch>` for a branch (diffs from the merge base, showing only what the branch added); `git log <branch> --not origin/main` for the branch's own commits.

FIX PROPOSED (mechanical, since a doc is the weakest rung — only helps if read at the moment of typing, under the alarm that suppresses careful reading): primary, a `bun ops project diff --seq <n>` verb answering "what did this branch change" correctly by construction; secondary, a rule in `.claude/docs/parallel-agents.md`. `.claude/docs/test-lanes-and-capabilities.md:70` already uses three-dot incidentally; nothing in-repo teaches two-dot.

GENERALIZABLE PRINCIPLE (Sophia's detector, cheaper than verifying every figure): when an observation is much bigger than the thing it is supposedly about, suspect the instrument before the world.

INCIDENTAL, not filed separately: project-11682 has zero own commits and sits 11k behind main — evidence of stale project branches/worktrees.
