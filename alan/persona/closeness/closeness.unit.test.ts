import { describe, expect, test } from "bun:test"
import { DEFAULT_GREEN_DAY_POINTS } from "../../../readouts/ring/ladder/ladder.ts"
import {
  clampLevel,
  GREEN_BASELINE_DAYS,
  LEVELS,
  levelForGreenDays,
  levelForPoints,
  percentProgressForGreenDays,
  percentProgressForPoints,
  STAGES,
} from "./closeness"

const FAITH_GREEN = 10_000
const FUN_GREEN = 100

describe("STAGES", () => {
  test("five Knapp stages in order", () => {
    expect(STAGES).toEqual([
      "Initiating",
      "Experimenting",
      "Intensifying",
      "Integrating",
      "Bonding",
    ])
  })
})

describe("LEVELS", () => {
  test("six entries: the five-stage relationship ladder plus the boost-only L6 imagery tier", () => {
    expect(LEVELS).toHaveLength(STAGES.length + 1)
    for (const [i, level] of LEVELS.entries()) {
      expect(level.level).toBe(i + 1)
      expect(level.closeness.length).toBeGreaterThan(0)
      expect(level.wardrobe.length).toBeGreaterThan(0)
      expect(level.pose.length).toBeGreaterThan(0)
    }
  })

  test("L1-5 stages match STAGES in order", () => {
    for (const [i, stage] of STAGES.entries()) {
      expect(LEVELS[i]?.stage).toBe(stage)
    }
  })

  test("L6 is imagery-only: its own imagery tier, never its own stage", () => {
    const l6 = LEVELS[5]
    expect(l6?.level).toBe(6)
    expect(l6?.stage).toBe("Bonding")
    expect(l6?.closeness).not.toBe(LEVELS[4]?.closeness)
  })
})

describe("clampLevel", () => {
  test("clamps a level into the 1..5 relationship-ladder range (stage/imagery)", () => {
    expect(clampLevel(0)).toBe(1)
    expect(clampLevel(1)).toBe(1)
    expect(clampLevel(3)).toBe(3)
    expect(clampLevel(5)).toBe(5)
    expect(clampLevel(6)).toBe(5)
    expect(clampLevel(9)).toBe(5)
  })
})

describe("GREEN_BASELINE_DAYS", () => {
  test("is the shared four-transition Knapp schedule [7, 42, 180, 540]", () => {
    expect(GREEN_BASELINE_DAYS).toEqual([7, 42, 180, 540])
  })

  test("cumulative arrival is 7 / 49 / 229 / 769 green-days", () => {
    const cumulative: number[] = []
    let sum = 0
    for (const step of GREEN_BASELINE_DAYS) {
      sum += step
      cumulative.push(sum)
    }
    expect(cumulative).toEqual([7, 49, 229, 769])
  })
})

describe("DEFAULT_GREEN_DAY_POINTS", () => {
  test("is the Faith/Learn byte-points baseline (10,000)", () => {
    expect(DEFAULT_GREEN_DAY_POINTS).toBe(10_000)
  })
})

describe("levelForPoints", () => {
  test("0 points → level 1", () => {
    expect(levelForPoints(0)).toBe(1)
  })

  test("one point below the first green threshold stays level 1", () => {
    expect(levelForPoints(7 * FAITH_GREEN - 1)).toBe(1)
  })

  test("each cumulative green-day threshold steps the level (Faith green)", () => {
    expect(levelForPoints(70_000)).toBe(2)
    expect(levelForPoints(489_999)).toBe(2)
    expect(levelForPoints(490_000)).toBe(3)
    expect(levelForPoints(2_290_000)).toBe(4)
    expect(levelForPoints(7_690_000)).toBe(5)
  })

  test("clamps at level 5 for stockpiled points (four-transition schedule)", () => {
    expect(levelForPoints(7_689_999)).toBe(4)
    expect(levelForPoints(100_000_000)).toBe(5)
  })

  test("a per-value green threshold scales every threshold (Fun green)", () => {
    expect(levelForPoints(699, GREEN_BASELINE_DAYS, FUN_GREEN)).toBe(1)
    expect(levelForPoints(700, GREEN_BASELINE_DAYS, FUN_GREEN)).toBe(2)
    expect(levelForPoints(22_900, GREEN_BASELINE_DAYS, FUN_GREEN)).toBe(4)
    expect(levelForPoints(26_956, GREEN_BASELINE_DAYS, FUN_GREEN)).toBe(4)
    expect(levelForPoints(76_900, GREEN_BASELINE_DAYS, FUN_GREEN)).toBe(5)
  })

  test("default schedule + green match an explicit Faith call", () => {
    expect(levelForPoints(490_000)).toBe(
      levelForPoints(490_000, GREEN_BASELINE_DAYS, DEFAULT_GREEN_DAY_POINTS)
    )
  })

  test("negative points clamp to 0 → level 1, at any green", () => {
    expect(levelForPoints(-5_000)).toBe(1)
    expect(levelForPoints(-5_000, GREEN_BASELINE_DAYS, FUN_GREEN)).toBe(1)
  })
})

describe("percentProgressForPoints", () => {
  test("0 points → 0% (start of the L1 step)", () => {
    expect(percentProgressForPoints(0)).toBe(0)
  })

  test("halfway through the L1 step → 50% (Faith green)", () => {
    expect(percentProgressForPoints(35_000)).toBe(50)
  })

  test("crossing into a higher step resets to 0%", () => {
    expect(percentProgressForPoints(70_000)).toBe(0)
    expect(percentProgressForPoints(490_000)).toBe(0)
  })

  test("measures within the current (non-uniform-width) step", () => {
    expect(percentProgressForPoints(280_000)).toBe(50)
  })

  test("at or above the L5 clamp there is no further step → 100", () => {
    expect(percentProgressForPoints(7_690_000)).toBe(100)
    expect(percentProgressForPoints(100_000_000)).toBe(100)
  })

  test("scales by a per-value green threshold (Fun green)", () => {
    expect(percentProgressForPoints(350, GREEN_BASELINE_DAYS, FUN_GREEN)).toBe(50)
  })
})

describe("levelForGreenDays", () => {
  test("0 green-days → level 1", () => {
    expect(levelForGreenDays(0)).toBe(1)
  })

  test("one fraction below the first cumulative threshold stays level 1", () => {
    expect(levelForGreenDays(6.999)).toBe(1)
  })

  test("each cumulative green-day threshold steps the level", () => {
    expect(levelForGreenDays(7)).toBe(2)
    expect(levelForGreenDays(48.999)).toBe(2)
    expect(levelForGreenDays(49)).toBe(3)
    expect(levelForGreenDays(229)).toBe(4)
    expect(levelForGreenDays(769)).toBe(5)
  })

  test("clamps at level 5 for stockpiled green-days", () => {
    expect(levelForGreenDays(768.999)).toBe(4)
    expect(levelForGreenDays(10_000)).toBe(5)
  })

  test("negative green-days clamp to 0 → level 1", () => {
    expect(levelForGreenDays(-5)).toBe(1)
  })

  test("equivalent to levelForPoints once native is divided by greenDayPoints", () => {
    for (const [native, gdp] of [
      [3_846, 360],
      [4_228_400, 10_000],
      [26_956, 10_000],
      [35_626, 3_600],
    ] as const) {
      expect(levelForGreenDays(native / gdp)).toBe(levelForPoints(native, GREEN_BASELINE_DAYS, gdp))
    }
  })
})

describe("percentProgressForGreenDays", () => {
  test("0 green-days → 0% (start of the L1 step)", () => {
    expect(percentProgressForGreenDays(0)).toBe(0)
  })

  test("halfway through the L1 step → 50%", () => {
    expect(percentProgressForGreenDays(3.5)).toBe(50)
  })

  test("crossing into a higher step resets to 0%", () => {
    expect(percentProgressForGreenDays(7)).toBe(0)
    expect(percentProgressForGreenDays(49)).toBe(0)
  })

  test("measures within the current (non-uniform-width) step", () => {
    expect(percentProgressForGreenDays(28)).toBe(50)
  })

  test("at or above the L5 clamp there is no further step → 100", () => {
    expect(percentProgressForGreenDays(769)).toBe(100)
    expect(percentProgressForGreenDays(10_000)).toBe(100)
  })

  test("unitless: matches the scaled native percentProgress", () => {
    expect(percentProgressForGreenDays(3.5)).toBe(
      percentProgressForPoints(35_000, GREEN_BASELINE_DAYS, DEFAULT_GREEN_DAY_POINTS)
    )
  })
})
