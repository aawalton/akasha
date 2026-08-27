---
id: 792cc00c-3f4f-598b-b6c8-da5d8c2c1d66
page-type-slug: finding
title: "The green day units ladder scores rather than draws, and stands in the drawing package"
domain-slug: page-type/daily-tracking
---

# Claim

`GREEN_DAY_UNITS_LADDER` has stopped being a drawing scale and become daily tracking's scoring ladder, while still standing in the package that draws readouts.

# Evidence

Found on 2026-08-21, when the values and persona stoplights stopped drawing with it.

The ladder duplicates `domains/readout-scales/readout-scale-green-day-units.md` — 0.25 red, 0.5 yellow, 1 green, 2 blue — and the numbers agree. Every other ladder of that kind was deleted from `packages/shared/status-bar-access/src/readout-scales.ts` as its group moved onto its documents. This one could not be, and the reason is not that a circle still needs it.

Its five non-test readers, all confirmed at the time: `daily-stoplights.ts` inside `aggregateValueUnits`, which exists only to serve daily tracking; `stoplight-mean-points.ts` in six places, where it turns every stoplight's tier — inbox, upkeep and value alike — into points; and `points-source-document-check.ts` as a default argument.

None of those draws anything. What the ladder now does is score: it says what a tier is worth, not what colour a reading takes. Those are two claims that happen to share four numbers today, and nothing says they must keep sharing them.

Left where it is, the next person to move a scale into data will find a drawing constant in the drawing package with no drawing left in it, and either delete it and break the scoring, or copy the numbers a third time.
