---
id: b8d52cbd-6b02-5049-9c4e-b3ff0734cbb0
slug: unresolved-pathspec-silent
page-type-slug: finding
title: "Unresolved pathspec silent"
domain-slug: domain/dispatch
---

# Claim

A dispatch brief, role contract or routed instruction can prescribe an act — run this, call that, read this path — whose target does not resolve, and nothing reports the mismatch; the failure is silent whenever the unresolved reference is a pathspec rather than a verb or flag.

# Evidence

Project #17166 (status someday_maybe, live-on deploy, domain `dispatch`). No objective was ever written; captured from the row's notes on 2026-08-15.

Three instances in one evening moved this past a data point:
1. #16972's brief prescribed `persona load --no-claim`. No such verb, no such flag; the real one is `bun ops persona compose <slug>`, which claims no agent name inherently. Caught by the manager at premise-check.
2. Two of seven premise-check briefs named pathspecs matching nothing: `packages/agents/cli/src/worktree` (does not exist) and `/home/walton/instructions/skills` (a different repository). Shipped to seven agents at once, ninety minutes after the parent failure the remedy was for was filed.
3. The root CLAUDE.md's ephemeral passage named a cancelling mechanism that is unreachable — `GIT_REPO_DIR` resolves such that a branch worktree is neither half of the control, so the stated escape could never fire.

Why the existing check does not reach it: `check-repo-paths` already resolves cited path literals against the filesystem for committed markdown. Dispatch briefs are not committed markdown — they are spawn prompts and row notes, prose consumed exactly once by an agent with no independent way to know the instruction was well-formed.

The arms are not symmetric: a nonexistent verb or flag fails loud (the CLI refuses with a did-you-mean). A nonexistent pathspec is silent — `git log` on a path matching nothing returns zero lines at exit 0, indistinguishable from a genuinely clean result. Instance 2 above is the silent arm, and it is the one that shipped.

Not to be confused with #17158, which is about a recorded destination rotting after the fact (where a finding went); this is about a prescribed act that never resolved at the moment it was written.
