---
id: e841be8a-151f-57ce-820f-9794d6e8114a
page-type-slug: finding
title: "Deleted check duty lives in prose"
domain-slug: domain/global
---

# Claim

A deleted check's duty was rewritten into two docblocks in two packages, in two wordings, and nothing now reports the drift it was bought to catch.

# Evidence

The check was `status-vocabulary-drift`, removed under #17857. It held the live `status` property-definition row equal to `PROJECT_STATUS_VALUES` in membership, order and colour.

Removing it looks right, and this finding does not argue with that. The row can be edited from the UI at any time, so the gate's verdict was not a function of the change under test and it could not say which side had moved.

What replaced it is prose, in two places and two wordings. `packages/alanwalton/projects/core/lib/project-status-variants.ts:33` says in bold: "Carrying the deployed row in step belongs to whoever changes this map, in the same pass, that being the only point at which both sides are known together." `packages/infra/checks/src/lib/status-vocabulary-drift.ts:10` says: "Keeping the deployed row in step with a source transition is now the job of whoever lands the transition." Two packages, one duty, neither pointing at the other. That is already the drift the arrangement was meant to prevent, in the text describing it.

The duty cannot be checked from this repository. The first file says so itself: the row "moves out of band, with no commit anywhere." So the obligation governs an act that leaves no trace here, assigned to an unnamed future party who has no reason to open either file.

There is a prior incident and the same file records it: the deployed options once outran the source vocabulary by three values. It adds that this now happens "with nothing to report it."

`domains/code-harness.md` binds the general form — every claim about a change is made by an instrument rather than by a seat. A docblock is not an instrument.

What is NOT filed here is the remedy. Restoring the old gate would rebuild the flaw that got it deleted. Whether the right answer is an instrument that reads the row and reports drift without gating a crossing, an audit on its own clock, or accepting the loss deliberately, is a judgment that needs the check's history read rather than a comment edit.
