---
id: 0b0ebc23-37bc-5519-b079-d84635b0017d
page-type-slug: finding
title: "Definition does not reach the close"
domain-slug: task/review-initiative
---

# Claim

The Definition names what stages 1 to 4 do — settling which objectives are met and what moves the rest — and does not reach stage 5, the close, which runs precisely when there is no rest.

# Evidence

Measured 2026-08-06 on `domains/tasks/lead/review-initiative.md` at `reviewed-at: 2026-08-06`.

`domains/tasks/lead/review-initiative.md:12` — "**Review initiative** — settling which of an initiative's objectives are met and what moves the rest."

Stages 1 to 4 answer to that line. Stage 1 sets each checkbox by measuring; stages 2 and 3 name what is moving and where the blockers are; stage 4 reports. That is "which are met" and "what moves the rest".

Stage 5 is headed "When every objective is met" (line 32) and holds three acts: read the domain against what now stands, carry the closing to Alan with whatever that reading left open, and delete the initiative last. None of the three is covered by either half of the Definition, and the branch runs in the one case where "the rest" is empty.

The reading left the line alone and said why: the bullet is at its ceiling. That measures out. `tools/document/schemas/domain.ts:148` caps a Definition bullet at `Statement`, and `tools/document/tokens.ts:23` sets `Statement` to 100. The bullet measures 97 characters with the strong marks stripped. That is the bound doing its work, not a defect in it — a line naming the close as well would have to be written shorter elsewhere rather than added to.

Not established: whether the Definition is meant to cover every stage of a sequence, or only the pass's ordinary shape with a terminal branch left to the body. Nothing in `domains/domain-definition.md` or `domains/task.md` says which.

Raised by the `review-instructions` reading of this document on 2026-08-06.
