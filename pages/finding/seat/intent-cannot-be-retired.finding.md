---
id: 60c6f8f8-e96f-578f-abc9-0640ec210e27
slug: intent-cannot-be-retired
page-type-slug: finding
title: "Intent cannot be retired"
domain-slug: page-type/seat
---

# Claim

The Intent entry on `domains/seat.md:29` is written so nothing can retire it. It reads "A dispatched seat is assigned one initiative, and a persona seat carries every initiative it has picked up." The first clause is genuinely not yet true. The second cannot be measured: what a persona has picked up is, as `tools/seat.ts --help` says, "computed by `bun tools/owns.ts` and deliberately stored nowhere". `domain-intent.md` says an entry leaves once it is true, and no instrument can test this true.

# Evidence

Raised by a review-instructions seat on `domains/seat.md`, which called it a defect in shape rather than a wrong fact, and did not land a change because a word change to an Intent line is reserved under Every Changed Line.

I verified line 29 reads as quoted. The reviewer reported the help text and that its own dispatched seat carries zero initiatives rather than one, which is its evidence that the first clause is not yet true; I did not check its seat.

Not measured: whether the second clause could be made testable, or whether it belongs in Design rather than Intent — a state that holds by construction rather than one the domain is moving toward.
