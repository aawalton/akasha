---
id: 485573fd-2d19-5a25-a8ae-a79e43beadd8
slug: reviewers-split-on-the-collision
page-type-slug: finding
title: "Reviewers split on the collision"
domain-slug: page-type/domain
---

# Claim

Two seats dispatched on `review-instructions` in the same pass read the collision between Every Changed Line and their own task oppositely: one landed three unshown changes to a domain's Design, the other declined to land two it recommended — so what a domain document gets from a reading turns on which way the reviewer read it.

# Evidence

Measured 2026-08-11, across the first four readings of a `review-documents` pass. Both seats carried the same persona, role, task and mode, and an agent principal with no release stated in either dispatch.

`domains/domain.md`, Every Changed Line: "Show Alan each line you would change in a domain's Definition, Design, Intent, Principles or Rules." `domains/tasks/archivist/review-instructions.md` instructs the seat to cut, repair, trim and rewrite, and to "Land each decision as its own commit". Those five sections are the whole body a domain document may hold, Tasks excepted, per `tools/document/schemas/domain.ts`.

The seat on `domains/agent-turn-end.md` landed three repairs to Design — `2919b43f3`, `1eea4f459`, `6accaaa85` — and reported the collision nowhere. The claims it repaired were false, and the strongest of them said a turn end is judged by a model reading the transcript, which is the opposite of what the headless guard does.

The seat on `domains/memory.md` landed a `reviewed-at:` stamp alone at `a9a2d60d6` and handed back two changes it recommended, naming the collision itself: "Every Changed Line and review-instructions ask for different things when the subject is a domain… nothing on either document adjudicates. I took the narrower instruction as winning."

`domains/role-responsibilities.md` carries the parallel rule for roles with a carve-out — "A cut a dispatched review lands is not a changed line" — which `domains/domain.md` does not carry. That wording gap is filed separately at `pages/finding/domain/changed-line-lacks-dispatch-carve-out.finding.md`; this is the divergence it predicted, observed.

Not measured: how the two remaining domain subjects in this pass will read it, or whether any earlier dispatched reading landed domain-body changes. Seven of the pass's 102 subjects are still domain or task documents; the other ninety-one are refusals, which carry none of the five sections.
