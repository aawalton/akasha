---
id: 298a512d-4732-5bda-bdf8-7792351dce76
slug: scales-stand-in-two-places
page-type-slug: finding
title: "The eleven readout scales stand as pages and as constants, and every product reads the constants"
domain-slug: page-type/readout-scale
---

# Claim

The eleven readout scales stand in two places that nothing holds together: as file-backed pages under `domains/readout-scales/` — today `readouts/scale/*.readout-scale.md`, 12 of them — now projected into the pages store, and as hand-typed constants in `packages/shared/status-bar-access/src/readout-scales.ts`, today `readouts/ring/ladder/ladder.ts`. Every product reads the constants; nothing reads the pages.

Half of that last sentence has moved. `readouts/readout-catalog.ts:218-232` now reads the scale pages into a catalog, and `readouts/readout-resolver.ts:94-109` draws a readout against the page its `scale-slug` names. What has not moved is the second copy: `readouts/ring/ladder/ladder.ts:3` still hand-types `GREEN_DAY_UNITS_LADDER` at 0.25 / 0.5 / 1 / 2, `readouts/scale/green-day-units.readout-scale.md` states the same four by hand, nothing compares them, and `readouts/daily-stoplights.ts:47` and `readouts/stoplight-mean-points.ts:134-150` read the constant rather than the page.

# Evidence

Measured 2026-08-18, after #19403 landed its projection.

Searching both repositories for a consumer of the rows returns none. In the code repository every reference to the scales resolves to the hand-typed module — `persona-stoplights.ts`, `daily-stoplights.ts`, `inbox-stoplights.ts`, `upkeep-stoplights.ts`, `stoplight-circle.unit.test.ts` and `index.ts` all import from `./readout-scales`. In the instructions repository the only mentions of `readout-scale` outside the files themselves are two usage examples in `tools/commands/pages-mirror/project.ts`.

Those files are all one repository now, `readouts/`, and `ops pages-mirror` is a barred meaning. `readouts/readout-scale-shape.ts` is where a scale page is turned into a ladder today, and `readouts/persona-stoplights.ts`, `daily-stoplights.ts` and `upkeep-stoplights.ts` are still the drawing surfaces.

The two copies agree today, by hand rather than by anything: `GREEN_DAY_UNITS_LADDER`'s red rung is 0.25 and `readout-scale-green-day-units.md` declares `red-at: 0.25`; `SLEEP_HOURS_LADDER`'s is 6 and the file declares 6; `SURPLUS_HOURS_LADDER`'s is -8 and the file declares -8. Nothing compares them, so a file edited alone moves the store and leaves every product drawing the old colour.

Of those three pairs only the first still has two sides. `SLEEP_HOURS_LADDER` and `SURPLUS_HOURS_LADDER` stand nowhere in the tree; `readouts/scale/sleep-hours.readout-scale.md` (`red-at: 6`) and `readouts/scale/surplus-hours.readout-scale.md` (`red-at: -8`) are now the only statement of each. The green-day units pair is the one still doubled, and it is also carried by `pages/finding/readout-values-stoplights/ladder-copied-uncompared.finding.md` from the other side.

#19403's definition named this its own call to make: "`a58816a031` ... records that `readout-scales.ts` was hand-typed deliberately. Nothing yet argues either way about replacing it, so that is a decision this project makes rather than inherits." The delivering seat decided not to replace it and recorded only that the reasoning was "in the hand-back rather than taken silently" — so the reasoning travelled by message and no later reader can reach it.
