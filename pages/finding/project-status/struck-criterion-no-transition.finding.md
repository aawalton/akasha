---
id: 8d4ddb55-c51c-55bd-b99b-3cb32c671467
page-type-slug: finding
title: "Struck criterion no transition"
domain-slug: domain/global
---

# Claim

When a criterion is struck from a project row and leaves a remainder of uncovered work behind, nothing catches it, because every guard that could is a transition guard firing on a status change, and striking a criterion moves the row through no transition at all.

# Evidence

Project #17181 (status someday_maybe, live-on deploy, domain `project-status`); notes captured 2026-08-15, no objective written. Cut out of #16964 deliberately, on that project's manager's observation that no gate reaches this case.

The shape: a criterion is struck from a row; a remainder exists — work the criterion covered that nothing now covers. The row does not move, so no transition occurs, so nothing fires. The obligation exists from the moment of the edit and is reached by no mechanism at any later point. Every guard in the estate that could catch an unowned obligation is a transition guard, evaluating when a row moves between statuses. #16964's #16987 gates `awaiting_manager_claim`, `awaiting_lead_verification`, and (after amendment) the terminal close — all three are movements. A loss created by an edit that moves nothing is invisible to all of them, and widening any of them does not help.

Live instance: a criterion was struck from a child project because a sibling had already delivered it. What the strike left behind — one property the sibling did not cover — would have ridden out in a hand-back as a leftover, and was caught only because the manager stopped to ask whether the remainder had a home. Nothing in the situation asked it to.

Why the remedy is a write, not a watch: the obligation has to be created at the moment the criterion is struck, by the act that strikes it, rather than detected afterward by something scanning for orphans. A scanner has the silent-failure shape: an obligation nobody recorded is not enumerable, and a clean scan is what a healthy estate looks like. The striking edit is the one moment the remainder is known, since the agent doing it holds both what was covered and what is no longer covered.

Not to be merged with #16964: that row's construction is a gate on a transition, correct for the cases it reaches. This one cannot be a wider gate; the two remedies live on different sides of the same act.
