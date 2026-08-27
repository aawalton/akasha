---
id: 4216716a-dcba-5903-be4c-bcb663b1a599
page-type-slug: finding
title: "Policy tunables read by nothing"
domain-slug: domain/fitness
---

# Claim

Four of the seven selector tunables `ops exercise policy-show` prints are read by no selector — `weeklySetFloor`, `weeklySetCeiling`, `anchorBlockWeeks` and `zone2WeeklyFloor` are declared, defaulted, stored, printed and unit-tested, and no decision consults any of them.

# Evidence

Measured 2026-08-07. A quarantined document reported this for `weeklySetCeiling` alone and suspected `weeklySetFloor`; it recorded that checking the rest of the policy was "unknown and cheap to check". It was cheap, and the answer is four rather than two.

`ops exercise policy-show` — whose help reads "Show the selection-policy singleton (goal weights + selector tunables)" — printed today:

    weightLongevity 40 / weightEnergy 30 / weightFunctionality 20 / weightAesthetics 10
    noveltyCapPerSession 1 / anchorBlockWeeks 6 / weeklySetFloor 6 / weeklySetCeiling 12
    zone2WeeklyFloor 150 / recencyWeight 0.05 / recencySaturationDays 21

For each tunable I listed every file mentioning it outside `dist` and `node_modules`, then removed the three surfaces that only declare it — `selection/policy.ts`, `selection/policy.unit.test.ts` and `page-types/seed-tracking.ts`:

- `noveltyCapPerSession` → `selection/selector.ts`. Consumed.
- `recencyWeight` → `selection/recency.ts`. Consumed.
- `recencySaturationDays` → `selection/recency.ts`. Consumed.
- `anchorBlockWeeks` → nothing.
- `zone2WeeklyFloor` → nothing.
- `weeklySetFloor` → nothing.
- `weeklySetCeiling` → nothing.

The four unconsumed ones are fully furnished everywhere else. Taking `weeklySetCeiling`: typed at `policy.ts:34`, defaulted to 12 at `:61`, projected into the stored bag at `:83`, named among the parsed fields at `:157`, read off the singleton row with a fallback at `:176`, seeded as a page-type property at `seed-tracking.ts:317`, asserted at `policy.unit.test.ts:26`, and printed by `policy-show`. Every one of those reports that the value exists. None reports that anything acts on it.

The cost is stated by the surface itself: `policy-show` calls these "selector tunables", so a weekly set floor of 6 and ceiling of 12 read as bounds in force on Alan's training. They are not.

Not established: whether these were ever wired and later disconnected. The source names an issue opened for the ceiling; the value is unread today whatever became of it.
