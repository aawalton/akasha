---
id: 298a512d-4732-5bda-bdf8-7792351dce76
page-type-slug: finding
title: "The eleven readout scales stand as pages and as constants, and every product reads the constants"
domain-slug: page-type/readout-scale
---

# Claim

The eleven readout scales stand in two places that nothing holds together: as file-backed pages under `domains/readout-scales/`, now projected into the pages store, and as hand-typed constants in `packages/shared/status-bar-access/src/readout-scales.ts`. Every product reads the constants; nothing reads the pages.

# Evidence

Measured 2026-08-18, after #19403 landed its projection.

Searching both repositories for a consumer of the rows returns none. In the code repository every reference to the scales resolves to the hand-typed module — `persona-stoplights.ts`, `daily-stoplights.ts`, `inbox-stoplights.ts`, `upkeep-stoplights.ts`, `stoplight-circle.unit.test.ts` and `index.ts` all import from `./readout-scales`. In the instructions repository the only mentions of `readout-scale` outside the files themselves are two usage examples in `tools/commands/pages-mirror/project.ts`.

The two copies agree today, by hand rather than by anything: `GREEN_DAY_UNITS_LADDER`'s red rung is 0.25 and `readout-scale-green-day-units.md` declares `red-at: 0.25`; `SLEEP_HOURS_LADDER`'s is 6 and the file declares 6; `SURPLUS_HOURS_LADDER`'s is -8 and the file declares -8. Nothing compares them, so a file edited alone moves the store and leaves every product drawing the old colour.

#19403's definition named this its own call to make: "`a58816a031` ... records that `readout-scales.ts` was hand-typed deliberately. Nothing yet argues either way about replacing it, so that is a decision this project makes rather than inherits." The delivering seat decided not to replace it and recorded only that the reasoning was "in the hand-back rather than taken silently" — so the reasoning travelled by message and no later reader can reach it.
