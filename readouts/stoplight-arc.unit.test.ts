import { describe, expect, test } from "bun:test"
import type { DailyTierColor } from "./daily-tier.ts"
import { readoutCircle } from "./readout-scale-shape.ts"
import type { ReadoutScale } from "./readout-scale-shape.ts"

const TIER_RANK: Readonly<Record<DailyTierColor, number>> = {
  black: 0,
  red: 1,
  yellow: 2,
  green: 3,
  blue: 4,
}

const CALORIE_SCALE: ReadoutScale = {
  slug: "readout-scale-activity-calories",
  redAt: 100,
  yellowAt: 200,
  greenAt: 400,
  blueAt: 800,
}

function arcOverruns(
  circles: readonly { tier: DailyTierColor; nextTier: DailyTierColor | null }[]
): readonly string[] {
  const found: string[] = []
  for (const circle of circles) {
    if (circle.nextTier === null) continue
    const climbed = TIER_RANK[circle.nextTier] - TIER_RANK[circle.tier]
    if (climbed > 1)
      found.push(`${circle.tier} ring drew a ${circle.nextTier} arc, ${climbed} tiers up`)
  }
  return found
}

describe("an arc never runs more than one tier above the ring it sits on", () => {
  test("a reading drawn against an ascending scale, wherever on it the reading falls", () => {
    const drawn = [-20, -1, 0, 0.5, 1, 40, 99, 100, 160, 199, 200, 400, 799, 800, 900, 3000].map(
      (reading) => readoutCircle({ reading, scale: CALORIE_SCALE, unit: "whole" })
    )
    expect(arcOverruns(drawn)).toEqual([])
  })
})
