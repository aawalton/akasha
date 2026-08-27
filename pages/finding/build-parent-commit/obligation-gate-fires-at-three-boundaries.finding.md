---
id: 2ba4167d-39fa-5539-80e2-ec15f23ff1e0
slug: obligation-gate-fires-at-three-boundaries
page-type-slug: finding
title: "Obligation gate fires at three boundaries"
domain-slug: domain/global
---

# Claim

The obligation gate fires at three boundaries, not one: `awaiting_manager_claim`, `awaiting_lead_verification`, and the terminal close. The document names none of them, and the earliest demands something different from the other two.

# Evidence

Measured 2026-08-06 from `ops project move-to --help`, sharpening a fork returned by the reading of `build-parent-commit.md`, which reported the gate as firing at `awaiting_lead_verification` alone.

The help states it fires "at THREE boundaries the same way, passed over or landed on: awaiting_manager_claim, awaiting_lead_verification, and the terminal close (done / not_doing / duplicate)."

The two kinds of demand are not the same:

- At `awaiting_manager_claim` — "every unresolved obligation must name a holder that can still act — `manager`, or a `#<seq>` resolving to an open row of this tree".
- At the two closing boundaries — "the holder stops mattering and every obligation must be RESOLVED whoever holds it", by a `resolution` object recording either `{"act":"discharged","by":"<who>"}` or `{"act":"released","by":"<who>","reason":"<why>"}`.

`domains/tasks/projects/build-parent-commit.md` stage 1 is what puts obligations on the row. Nothing between there and the end names either demand.

The reading declined to add a line, on the ground that the gate "refuses in its own words and names what is missing, so the seat learns at the moment of the move and can still write the resolution then". That argument holds for a boundary the seat is about to cross deliberately. It is weaker for `awaiting_manager_claim`, which the help says fires whether "passed over or landed on" — a seat can meet it without having chosen to move there.

Filed rather than repaired: whether a stage should restate a gate that refuses loudly is the judgment the reading returned, and it is unchanged by the count. What changes is the size of what a line would have to say.

Not established: whether any seat has been refused at the claim boundary in practice.
