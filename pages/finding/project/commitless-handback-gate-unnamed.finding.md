---
id: a155cd6d-f126-51df-ac40-1a4e54a680b7
page-type-slug: finding
title: "Commitless handback gate unnamed"
domain-slug: barred-meaning/project
---

# Claim

Two independent readings of build tasks found that a seat obeying "the project may turn out not to want doing" is refused at the hand-back gate, which demands a recorded commit or a declared `noCommitReason`. Both drafted a line naming the way through, and both cut it.

# Evidence

Measured 2026-08-06 over two `review-instructions` readings run hours apart on sibling documents, neither seat seeing the other's work.

The invariant, standing word for word on all six build tasks: "**The project may turn out not to want doing.** Handing it back undone is an outcome rather than a failure..."

The gate, per `ops project move-to --help`: `awaiting_manager_verification` requires the row to have recorded a commit, or to declare `noCommitReason` via `ops project update`. No surface under `domains/` mentions either key.

The reading of `build-child-commit.md` drafted a bullet and killed it, on evidence: project #17926, a child of tree #17924, carries a commit `git cat-file` confirms is an instructions-repo commit, and that row reached `done`. It concluded the gate is passable by ordinary work and that a seat hitting it gets a refusal naming both the condition and the verb — Cut The Obvious against its own addition.

The reading of `build-child-deploy.md` reached the same place by a different route: the gate "refuses in its own words" and names both the field and the verb, so the refusal teaches what a boot-time line would, and every reader pays for a line only some readers need. It returned the trade rather than settling it — "Your call whether that trade is right."

What is on record is therefore a convergence rather than a fork: two seats, independently, judged the line not worth its bytes for the same stated reason. The observation is that both nonetheless found the gap worth raising, which is what a claim needs to be non-obvious.

Not established: whether any seat has actually been refused at this gate in practice. Neither reading found such a case, and neither looked for one.
