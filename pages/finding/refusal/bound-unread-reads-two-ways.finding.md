---
id: 7af74c8c-7870-5f5e-b061-099fa3a799c6
slug: bound-unread-reads-two-ways
page-type-slug: finding
title: "Bound unread reads two ways"
domain-slug: page-type/refusal
---

# Claim

The body of `refusals/schema-bound-unread.md` opens "no code path reads `{kind}`", which has two readings asking for different acts: no code in the repo reads this property, so delete the bound or write the code; or no read was observed this run, so the corpus may hold no document there and one should be written. The check only ever refuses for the first, having already ruled the second out — and the body drops exactly that counterfactual.

# Evidence

Found by the dispatched `review-instructions` seat reading the document on 2026-08-12, which rendered the body at both shapes the caller produces and read the one printing site. The check's three states are: some bound read, silent; none read and none walked, silent; none read but some walked, this refusal. Its own docstring calls that distinction the whole difficulty.

Not hypothetical: `schemas-bind` reports 69 bounds this corpus does not reach on this repo today — 69 live instances of the reading the refusal never means.

The seat landed nothing, the task sending a line whose readings ask for different things back to its principal. Its recommendation, about the current length: "no code path reads `{kind}`, though this corpus does reach it, so the {count} bound(s) declared there refuse nothing: {at}".

That wording also retires three smaller faults in the same clause, which is why they were not committed separately: `its` takes a dotted string as antecedent, so it reads as a position kind possessing bounds of its own kind; at count 1 the `(s)` hedge covers the noun but not the verb; and `{at}` renders schema-internal positions that look like file paths, where the refusal schema insists every path is spelled from the repository root.

Not measured: whether any reader has taken the second reading.
