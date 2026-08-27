---
id: e3310c4f-c5fe-576d-9fe3-b583759614b5
page-type-slug: finding
title: "Set reads exhaustive"
domain-slug: list/idle-live-seat
---

# Claim

The six cases on `domains/lists/idle-live-seat.md` read as exhaustive and are not. Both sibling failure lists, `headless-not-done` and `headless-not-blocked`, carry the line "The set is what has been caught rather than everything there is." This one does not, though it gained its sixth member on the morning it was written, out of a dry run.

# Evidence

Observed by a dispatched `review-instructions` seat on 2026-08-11, which drafted the missing line in its report and did not land it: the caveat is a Design line, and Every Changed Line on `domains/domain.md` reserves those for Alan.

Not measured: whether the two siblings are the right pattern to match, or whether the caveat belongs on the list schema instead of on each list.
