---
id: 8a03d8af-82ab-5125-a009-383659c8a542
slug: two-invariants-on-closing
page-type-slug: finding
title: "Two invariants on closing"
domain-slug: domain/global
---

# Claim

`define-project` contradicts itself about closing a project. Invariant 1 says this run "moves no status". Invariant 2 says the project set is yours to "combine, split, sequence and close as freely as the work needs", and line 19 says a project nobody needs "is cheapest to close before a seat is spawned onto it". The machinery offers two closing acts: `move-to --status not_doing`, which invariant 1 forbids, and `ops project delete`, which soft-deletes and moves no status. Nothing says which.

# Evidence

Raised by the review-instructions reading of 2026-08-07, which landed three commits and left this: no single line reaches it, and the two ways out cost different things.

Verified myself in the live document. Line 36: "This run ends where the dispatch begins, and moves no status." Line 38: "The shape of the project set is yours to change for as long as it is undispatched. Combine, split, sequence and close as freely as the work needs." Line 19: "A project nobody needs is cheapest to close before a seat is spawned onto it."

The reviewer reports grepping the whole corpus for what would decide it: no document uses "ladder", `not_doing` or `duplicate`, and the only statuses any document names are `someday_maybe`, the two `awaiting_*_claim` on dispatch-project, and the three `awaiting_*_verification` on the verify and build tasks. So nothing tells a lead which verb closes a project, while every other act on this document names its command. I did not re-run that sweep.

The two ways out, as stated: narrow invariant 1 to the authorization it is guarding, which licenses a close by `move-to`; or name the closing act as `ops project delete`, which leaves invariant 1 standing and commits every close to a soft-delete.
