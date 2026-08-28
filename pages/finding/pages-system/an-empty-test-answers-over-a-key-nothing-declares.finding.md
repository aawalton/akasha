---
id: c77a3e53-41bd-52d4-b326-7f0fe7537218
page-type-slug: finding
title: "An empty test answers over a key nothing declares"
domain-slug: domain/pages-system
---

# Claim

`tools/lib/page-query.ts` holds a test to what the page type declares in every slot but `empty`.
A test naming a key no property declares and no page carries reaches the reader as a refusal,
carried by the `absent` field — except where that test is `empty`, where the key never enters
`absent` and a clean answer comes back over every page. Measured 2026-08-27 against the akasha
tree by calling `answer()` directly.

# Evidence

**The same undeclared key, refused in one slot and answered in the other.** Against `domain`,
which has 740 pages, with `colour` declared by no property and carried by no page:

    where [{key: colour, notIn: [red]}]   n=740  absent:["colour"]  -> refused at the boundary
    where [{key: colour, empty: true}]    n=740  absent:[]          -> answered clean
    where [{key: colour, empty: false}]   n=0    absent:[]          -> answered clean
    where [] (no narrowing at all)        n=740  absent:[]          -> answered clean

The `empty: true` row is indistinguishable from the last row, which asked nothing. The
`empty: false` row is a clean zero, which is the answer `absentSays` in
`tools/lib/page-query-bind.ts:17` exists to prevent, in its own words: "a zero here would say
nothing about what matched."

**`absent` is a refusal, not a note.** Every boundary out of this engine turns a non-empty
`absent` into a refusal, so the difference above is the difference between a refusal and a
success:

    tools/commands/page/query.ts:69      throws inputError, exit 1
    tools/lib/page-query-answer.ts:43    HTTP 400
    tools/lib/page-query-answer.ts:73    HTTP 400

**Where it comes from.** `CARRIED` at `tools/lib/page-query.ts:177` reads `["key", "empty"]`, and
`valued()` beneath it calls a test valued only where it states a slot outside that list. The set
`unseen`, which becomes `absent`, is seeded from valued tests alone, so a test stating nothing but
`key` and `empty` never puts its key up against the declaration.

**A genuine empty and this failure read alike, which is the fault.** On the same 740 pages,
`persona-champion-slug` is declared and genuinely empty on most of them:

    where [{key: persona-champion-slug, empty: true}]    n=703  absent:[]
    where [{key: persona-champion-slug, empty: false}]   n=37   absent:[]

Nothing in the shape of the `colour` answer tells a reader it is not this one.

**The other engine refuses both.** `pages-system/query/query.ts` checks a `where` against the
page type's declared shape before running it, and refuses an undeclared key whatever the test:

    {colour} != "red"    refused: no property is declared under the key `colour`
    {colour} == absent   refused: no property is declared under the key `colour`
    {slug} != "red"      checked

So the two engines disagree on `empty` and agree on `notIn`, once the boundary is counted.

# Bearing

This is the half left open by a finding slugged `a-select-is-silent-and-the-write-seam-is-ungated`,
measured 2026-08-20 and taken away on 2026-08-28, its subject having been the page query service
answering over HTTP, which is deleted. It found a bad `where` key loud and a bad `keys` key silent, and wrote
that `absent` "already separates the two failure modes; it is simply not computed for `keys`."
The `keys` half was closed since: `unfound` is computed beside `unseen` and carries it. The shape
survived in a third place nobody looked, which is the `empty` slot of a `where`.

What the two have in common is not the slot. It is that the answer's shape says a judgement was
made where none was, and a reader holding only the answer cannot tell which they have.
