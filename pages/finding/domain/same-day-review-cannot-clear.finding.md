---
id: 1695ef24-9ae3-559c-a638-04969a15d4d1
page-type-slug: finding
title: "Same day review cannot clear"
domain-slug: page-type/domain
---

# Claim

A review landing on a surface already stamped with today's date cannot clear its own staleness, because the reading measures churn since the commit that wrote `reviewed-at:` and a same-day review changes neither the date nor that commit.

# Evidence

Measured 2026-08-05, immediately after a `review-instructions` pass landed fourteen commits on `tasks/lead/define-principle-or-rule.md` and a concurrent pass landed on `tasks/lead/decide-principle-or-rule.md`.

`bun tools/stale-reviews.ts` lists both files as owed a reading, seconds after each was read whole and walked slice by slice. Both already carried `reviewed-at: 2026-08-05`, written earlier the same day, so neither reviewing seat had a date to advance — the field was already correct and editing it would have been a write of the same bytes.

Nothing in the repository writes that record. A recursive search for `record-review` across `tools/**/*.ts` returns no match, and `tools/document/schemas/domain.ts:53` documents the key as "spelled once for the schema and for the verb measuring churn since one" — naming the reader and no writer. `tools/stale-reviews.ts` is the reader.

So the instrument's zero and its positive both come from the same place: a surface reviewed on the day it was last stamped stays listed until someone edits the date to a later day, which is a false stamp, or until the next calendar day arrives and a further review happens. A seat that has just done the work reads the list and sees its own subject still owed, with nothing to do about it that is also true.

What it costs: the list cannot distinguish a surface nobody has read from one read an hour ago, on exactly the day the reading happened — which is the day anyone would consult it.

Not measured: how many other surfaces stand in this state, whether the churn threshold rather than the date is the binding part, and whether a writer verb existed before and was removed.
