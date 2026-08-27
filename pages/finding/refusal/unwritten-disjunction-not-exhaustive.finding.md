---
id: f4f31ca6-482d-5e0c-91a9-bcb2353f3d8d
page-type-slug: finding
title: "Unwritten disjunction not exhaustive"
domain-slug: page-type/refusal
---

# Claim

The "Either … or …" in `refusals/halt-reason-unwritten.md` is not exhaustive: a reason declared in WRITTEN ahead of the script arm that will write it fires this body and is neither cause, which is a shape the corpus lands deliberately.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/halt-reason-unwritten.md` dispatched from `review-documents`. The reading raised it and judged a third clause not worth what every reader of a body printing eighteen times at once would pay.

The body now reads: "WRITTEN in this check declares the guard records `{reason}` and no `record` call in {writers} writes it. Either the exit was renamed or removed and this declaration is stale, or the call is written in a shape this cannot read — in which case the reasons it does write are not being compared either."

The third case: a reason entered in WRITTEN before the script that emits it. The declaration is not stale and the call is not misshapen — it does not exist yet. A reader taking the body at its word repairs neither cause correctly.

That the corpus lands two-sided changes one side at a time is not hypothetical. `tools/checks/hook-reasons-mirror.ts:95-103` documents exactly that for `work-complete`: "the guard's arm for it landed here first on purpose, because the verdict `case` is fail-closed and a deployed decider emitting a word the script had no arm for would have blocked every finished seat at once."

The same reading repaired the body to name WRITTEN rather than paraphrase it, having found by driving the check that the sibling body which supplies that name does not print in the case where the reader most needs it — with every call rewritten out of the regex's reach, this body fires eighteen times and the sibling reports nothing.

Not measured: whether any reason stands in WRITTEN today ahead of its writer, or what a third clause would cost against the eighteen-at-once case the reading weighed it against.
