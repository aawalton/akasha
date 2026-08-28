---
id: cd5f9c92-4664-5b2a-84ce-15e7606bc090
slug: design-lines-owed-on-narrowing-and-origin
page-type-slug: finding
title: "Three facts about the query service are settled in code and recorded in no instruction"
domain-slug: domain/page-queries-system
---

# Claim

Three facts about the query service are settled in code and recorded in no instruction. Two
were carried in prose comments until the comment sweep; the third is the behaviour a repair
landed tonight, after a measurement found every file-backed page type silently widening a
query it could not read.

# Evidence

Proposed Design lines:

"A browser reaches the service at its own origin, never at the cluster name."

"A row-write takes one pass over the file that holds the rows, whether it carries one row or a
batch."

"A narrow the query service cannot read is refused, never dropped, because a dropped narrow
answers with every page of the type instead of the pages asked for."

The third is the important one and the measurement behind it corrected a belief I had been
acting on. An unrecognised narrow KEY was never dropped -- it already refused with a 400 on
all 331 populated types. The hole was an unrecognised OPERATOR or SHAPE, which is strictly
worse because it fires on keys the type does declare: `where: {"slug": {"eq": "harem-hotel"}}`
on `game` returned all 8 rows rather than one.

Measured across all 353 file-backed types on the live roster: an unrecognised operator, a bare
number, a bare boolean, a null, or a `where` given as an array widened to the whole population
on 353 of 353 before the fix, and refuses or answers correctly on 353 of 353 after.

`testOf` built its test by spreading only recognised slots, so an unreadable value collapsed to
a bare `{key}`; `valued()` excluded a bare test from `absent` detection, so no 400; and
`passes()` guards every comparison on `!== undefined`, so a bare test returned true for every
row. `queryFrom` dropped a non-object `where` entirely.

One gap remains open rather than closed: a type with zero pages answers a silent 0 rather than
a loud 400, because the `loaded.length === 0` guard suppresses `absent` for an empty corpus.
That is a missing refusal, not a widening.
