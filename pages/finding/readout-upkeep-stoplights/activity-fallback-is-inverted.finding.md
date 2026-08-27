---
id: b8392e39-8b9d-56e2-85e5-8ff346761359
slug: activity-fallback-is-inverted
page-type-slug: finding
title: "Activity fallback is inverted"
domain-slug: domain/global
---

# Claim

The legacy fallback in the activity reading is inverted. It holds a stored value on exactly the days the samples table already has one, and holds nothing on every day it exists to cover, so it cannot fire usefully on any day it was built for. Retiring it changes nothing Alan sees and makes the source single-provenance.

# Evidence

Measured 2026-08-11 against the live database.

**What it is for.** `packages/shared/status-bar-access/src/upkeep-inputs.ts:286-296` reads cardio calories from the samples table and falls back to a stored `activeCalories` scalar. Its own header states the reason: the scalar is legacy, "nothing writes it any more", and it exists only because the change shipped before Alan's Apple Health export had been imported, so his circle would not go blank on deploy.

**The export has landed.** `health_samples` carries 403,572 `activeEnergy` rows spanning 2022-12-05 to 2026-08-11.

**Where the fallback would fire.** Seven days in the sixty to 2026-08-11 hold no `activeEnergy` row: 2026-06-13 through 2026-06-18, and 2026-08-07.

**The inversion.** 17 `relationship-progress` rows carry a stored `activeCalories`, spanning 2026-06-19 to 2026-08-06 — beginning the day after the June run of gaps ends and ending the day before the August gap. None of the seven gap days carries one. So the fallback returns nothing on every day it is reached for, and the reading is already black on those days with only the strength term showing, which the caller adds precisely so a logged lift still counts.

**Why it is filed rather than fixed.** #18792 owns moving this readout's decisions into files. The measurement above is the part a seat would not re-derive: from the code alone the fallback reads as a live safety net, and the cheap act is to keep it.

**What it is not.** An audit reported this source as having no clean predicate on the ground that it branches. The branch is machinery and was deliberate, with its reason written above it. What is wrong is that the branch's purpose is spent, not that it was wrong to write.
