---
id: 00e44d54-1389-5445-8c3d-b8bf1b3b1e1b
slug: routing-table-worktree-mismatch
page-type-slug: finding
title: "Routing table worktree mismatch"
domain-slug: domain/global
---

# Claim

`docs:validate` resolves the principle-routing table against `CODE_ROOT` (main) unconditionally, while the instructions side reads it via `codeWorktree()` — so a routing entry that exists only in a worktree is invisible to the check that gates it. Two independent measurements (an earlier one and worker-17322's) reached the same 83/84-entry counts from different directions, and the mismatch made a project's success criterion unsatisfiable by any worker.

# Evidence

Project #17331, domain `code-check`, status someday_maybe, live-on deploy. Captured, not defined.

Defect: `docs:validate` resolves the principle-routing table against `CODE_ROOT` (`~/code`, main) unconditionally. The instructions side instead honours `codeWorktree()`. The two read different checkouts, so a routing entry existing only in a worktree is invisible to the check that gates it.

Corroboration: two independent observations of the same mechanism, both recorded in `skills/agent-harness/findings/carriers-on-different-clocks.md` — an earlier entry, and worker-17322's, which reached the same 83/84-entry numbers from a different direction. worker-17322 found it because it could not satisfy a success criterion.

Cost: made a success criterion unsatisfiable by any worker, and neither half of the fix safe alone. Landing the routing-table entry alone: `unrouted-principle` does not fire, but five other domains' in-flight branches redden, since the table is read from main for all of them. Landing the `domains.md` frontmatter alone: the declaring doc has no route the validator can see, so the parent's own gate deadlocks. The pair was withdrawn entirely and deferred past a deploy — the cost was a criterion, a worker's attempt, and a manager ruling, on a one-function discrepancy.

Before the obvious fix (call `codeWorktree()` in the validator): the definition act owes deciding which checkout each consumer of the routing table should read, and whether any is right to read main. A validator gating a branch should see the branch; one asserting what is live should see main — these may not be the same consumer, and one function currently serves both. `CODE_WORKTREE` already exists as an environment override.

Moved off the row's retired `notes` attribute on 2026-08-15.
