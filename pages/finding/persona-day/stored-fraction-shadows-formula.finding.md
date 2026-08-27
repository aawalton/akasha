---
id: b1c23339-4f39-5446-9f8f-aa31b0a340aa
slug: stored-fraction-shadows-formula
page-type-slug: finding
title: "A stored green-day-fraction shadows the formula and disagrees with it"
domain-slug: page-type/persona-day
---

# Claim

A stored `green-day-fraction` on a persona day shadows the formula that property declares, and the two disagree on days a persona earned points from more than one source.

# Evidence

Found on 2026-08-21 while moving the persona stoplights onto their documents, by a seat reading both the property and the files.

`green-day-fraction` is declared `type: formula`, computing `points / green-day-points`. 1,938 of the 1,942 files under `persona-days/` in the memory repository carry a stored literal under that same key. A stored value shadows the formula, so what is read back is whatever was written down rather than what the property says.

The stored numbers were not computed the way the property computes them. They are `source-points / green-day-points`, which counts one pillar of a persona's points and ignores the rest. Where a persona earned from only one source the two agree, which is why this went unseen.

Where she earned from more than one, they do not. On 2026-08-18: ione reads 3.3725 stored against 1.9675 by formula, natalie 5.7 against 2.85, aelwyn 0.259 against 0.

On 2026-08-20 the current writer emits no literal and all 41 personas agree, so the disagreement is bounded by whenever the writer stopped emitting one. Today's readings are unaffected. Historical days are not: the persona and value stoplights now take their readings from these files, so a day read today draws differently from the same day read before the move.

Four files carry no literal at all and are the only ones the formula has ever answered for.

This is the same class as an aggregate property that answered as empty rather than refusing: nothing reports the shadowing, and a stored number and a computed one read identically at the point of use.
