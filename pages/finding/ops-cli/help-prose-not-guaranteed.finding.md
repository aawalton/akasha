---
id: 60d60ed0-7f51-5663-bc37-37fc5f3b7030
page-type-slug: finding
title: "Help prose not guaranteed"
domain-slug: domain/ops-cli
---

# Claim

`CLAUDE.md:57`'s guarantee that `--help` output "is generated from the command registry, so it stays in sync with the code by construction" is true only of a verb's existence and flags — the hand-authored description prose can be as wrong as any document, and was, in three instances in one night (`pipeline retry --help`, `project deploy --help`, and a docstring in `load-workflow-configs-worktree.ts`).

# Evidence

Rule of Three, 3 cases: (1) `pipeline retry --help` calls itself "the PREFERRED cure for a transient / environmental CI failure (a git-transport OOM, a capacity blip)" — false for capacity: `assignedNode` has one writer, no clearer anywhere (`decide-retry` incl.), so a retry re-pins the same starved node, reproducing the wedge. (2) `project deploy --help` claims in 4 places it runs branch CI; it doesn't — only the merge queue's staging run checks code, so agents believe landing is gated when it isn't (#16371, athena). (3) `load-workflow-configs-worktree.ts`'s docstring claimed "propagates unchanged... transient semantics, correct for a contention-slow load," no code implementing it — the bug was the spec (#16203, closed).

Structural: `pipeline retry --help` refutes itself a paragraph up — paragraph 1: a retry uses "an existing pipeline IN PLACE — same pipeline row, same commit SHA, same inputs," entailing same node, so paragraph 1 already implies paragraph 2 is false. Nobody derives it: a recommendation reads as settled, a mechanism as background. aranya: paragraph 1's precision reads as expert-authored, raising confidence in paragraph 2 rather than a check.

Why re-verification cadence doesn't help: these docs didn't decay, they were wrong at birth. A stale claim has a delta a re-check finds; a born-wrong claim has none — never correct, nothing changed since. Caught only by deriving the claim from scratch, noticing it never followed — harder than gate/ownership decay.

Proposed, undecided: scope `CLAUDE.md:57` to existence/flags only; fix the 3 instances (`pipeline retry` capacity caveat, `project deploy` per #16371/athena, confirm #16203's docstring corrected); require a `--help` runtime claim to name its identifier so `git log -S <identifier>` verifies it — #16203's method at authoring, not triage; mutation-verify each (fixed text drops the claim, pre-fix made it).

Project #16377, someday_maybe, ops-cli, no objective; captured off retired `notes`, 2026-08-15.
