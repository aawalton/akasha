import { describe, expect, test } from "bun:test"
import type { DailyTierColor } from "./circle/tier/tier.ts"
import {
  type ReadoutScale,
  readoutRing,
  readoutLadder,
  readoutShape,
  readoutTierRing,
} from "./readout-scale-shape.ts"

const PLANT_GRAMS: ReadoutScale = {
  slug: "readout-scale-plant-grams",
  redAt: 40,
  yellowAt: 80,
  greenAt: 160,
  blueAt: 320,
}

const SURPLUS_HOURS: ReadoutScale = {
  slug: "readout-scale-surplus-hours",
  blackAt: -12,
  redAt: -8,
  yellowAt: -4,
  greenAt: 0,
  blueAt: 4,
}

const LIVE_COUNT: ReadoutScale = {
  slug: "readout-scale-live-count",
  redAt: 4,
  yellowAt: 2,
  greenAt: 1,
  blueAt: 0,
}

const DAILY_INBOX: ReadoutScale = {
  slug: "readout-scale-daily-inbox",
  blackAt: 100,
  redAt: 10,
  yellowAt: 1,
  blueAt: 0,
  earnedColorSlug: "green",
}

const BACKLOG_COUNT: ReadoutScale = {
  slug: "readout-scale-backlog-count",
  yellowAt: 0,
  orangeAt: 11,
  redAt: 21,
  blackAt: 31,
}

const ACTIVITY_CALORIES: ReadoutScale = {
  slug: "readout-scale-activity-calories",
  redAt: 100,
  yellowAt: 200,
  greenAt: 400,
  blueAt: 800,
}

describe("readoutShape — which way a scale runs is read off its numbers", () => {
  test("thresholds climbing from black to blue make an ascending scale", () => {
    expect(readoutShape(PLANT_GRAMS).direction).toBe("ascending")
    expect(readoutShape(SURPLUS_HOURS).direction).toBe("ascending")
  })

  test("thresholds falling from black to blue make a descending scale", () => {
    expect(readoutShape(LIVE_COUNT).direction).toBe("descending")
    expect(readoutShape(DAILY_INBOX).direction).toBe("descending")
    expect(readoutShape(BACKLOG_COUNT).direction).toBe("descending")
  })

  test("nothing is read from the slug — the same slug either way runs either way", () => {
    const up: ReadoutScale = { slug: "s", redAt: 1, yellowAt: 2, greenAt: 3, blueAt: 4 }
    const down: ReadoutScale = { slug: "s", redAt: 4, yellowAt: 3, greenAt: 2, blueAt: 1 }
    expect(readoutShape(up).direction).toBe("ascending")
    expect(readoutShape(down).direction).toBe("descending")
  })

  test("rungs run worst tier to best whatever order the document states them in", () => {
    expect(readoutShape(BACKLOG_COUNT).rungs).toEqual([
      { at: 31, color: "black" },
      { at: 21, color: "red" },
      { at: 11, color: "orange" },
      { at: 0, color: "yellow" },
    ])
  })

  test("a threshold the document leaves out is left out of the rungs", () => {
    expect(readoutShape(DAILY_INBOX).rungs.map((rung) => rung.color)).toEqual([
      "black",
      "red",
      "yellow",
      "blue",
    ])
  })

  test("`earned-color-slug` becomes the earned tier, and its absence leaves none", () => {
    expect(readoutShape(DAILY_INBOX).earnedTier).toBe("green")
    expect(readoutShape(PLANT_GRAMS).earnedTier).toBeNull()
  })
})

describe("readoutShape — a scale nothing could draw refuses, rather than being skipped", () => {
  test("one threshold says nothing about which way the reading runs", () => {
    expect(() => readoutShape({ slug: "s", redAt: 3 })).toThrow(/threshold/)
  })

  test("no thresholds at all refuses too", () => {
    expect(() => readoutShape({ slug: "s" })).toThrow(/threshold/)
  })

  test("thresholds that neither climb nor fall refuse", () => {
    expect(() => readoutShape({ slug: "s", redAt: 1, yellowAt: 5, greenAt: 2, blueAt: 9 })).toThrow(
      /neither climbs nor falls/
    )
  })

  test("two rungs at one number refuse, having no direction between them", () => {
    expect(() => readoutShape({ slug: "s", redAt: 2, yellowAt: 2 })).toThrow(
      /neither climbs nor falls/
    )
  })

  test("a black rung level with the rung above it refuses on the same footing", () => {
    expect(() => readoutShape({ slug: "s", blackAt: 0, redAt: 0, yellowAt: 4 })).toThrow(
      /neither climbs nor falls/
    )
  })

  test("an `earned-color-slug` naming no tier refuses", () => {
    expect(() => readoutShape({ ...DAILY_INBOX, earnedColorSlug: "teal" })).toThrow(
      /earned-color-slug: teal/
    )
  })
})

describe("readoutLadder — an ascending scale's rungs above black", () => {
  test("red, yellow, green, blue in the order the tiers climb", () => {
    expect(readoutLadder(PLANT_GRAMS)).toEqual([
      { threshold: 40, color: "red" },
      { threshold: 80, color: "yellow" },
      { threshold: 160, color: "green" },
      { threshold: 320, color: "blue" },
    ])
  })

  test("`black-at` is where black starts, never a rung of its own", () => {
    expect(readoutLadder(SURPLUS_HOURS)).toEqual([
      { threshold: -8, color: "red" },
      { threshold: -4, color: "yellow" },
      { threshold: 0, color: "green" },
      { threshold: 4, color: "blue" },
    ])
  })

  test("a descending scale has no ladder to climb, and says so", () => {
    expect(() => readoutLadder(LIVE_COUNT)).toThrow(/lower reading/)
  })
})

describe("readoutRing — an ascending reading drawn against a resolved scale", () => {
  test.each([
    [null, "black"],
    [0, "black"],
    [39, "black"],
    [40, "red"],
    [79, "red"],
    [80, "yellow"],
    [159, "yellow"],
    [160, "green"],
    [319, "green"],
    [320, "blue"],
  ] as const)("%p grams reads %s against 40/80/160/320", (grams, tier) => {
    expect(readoutRing({ reading: grams, scale: PLANT_GRAMS, unit: "whole" }).tier).toBe(tier)
  })

  test("the Plants circle as the documents draw it on a 160g day", () => {
    expect(readoutRing({ reading: 160, scale: PLANT_GRAMS, unit: "whole" })).toEqual({
      tier: "green",
      reading: "160",
      nextTier: "blue",
      progress: 0,
    })
  })

  test("moving green-at on the scale moves the tier, which is the whole point", () => {
    const raised: ReadoutScale = { ...PLANT_GRAMS, greenAt: 200 }
    expect(readoutRing({ reading: 160, scale: raised, unit: "whole" })).toEqual({
      tier: "yellow",
      reading: "160",
      nextTier: "green",
      progress: (160 - 80) / (200 - 80),
    })
  })

  test("`unit` here is the formatting mode, never the readout's grams", () => {
    expect(readoutRing({ reading: 160, scale: PLANT_GRAMS, unit: "hours" }).reading).toBe("160")
    expect(readoutRing({ reading: 7.5, scale: PLANT_GRAMS, unit: "hours" }).reading).toBe("7.5")
    expect(readoutRing({ reading: 7.5, scale: PLANT_GRAMS, unit: "whole" }).reading).toBe("8")
  })
})

describe("readoutRing — `black-at` puts black somewhere other than zero", () => {
  test.each([
    [-20, "black"],
    [-12, "black"],
    [-10, "black"],
    [-8, "red"],
    [-4, "yellow"],
    [0, "green"],
    [4, "blue"],
  ] as const)("%p surplus hours reads %s", (hours, tier) => {
    expect(readoutRing({ reading: hours, scale: SURPLUS_HOURS, unit: "hours" }).tier).toBe(tier)
  })

  test("progress runs from `black-at` rather than from zero", () => {
    expect(readoutRing({ reading: -10, scale: SURPLUS_HOURS, unit: "hours" })).toEqual({
      tier: "black",
      reading: "-10",
      nextTier: "red",
      progress: 0.5,
    })
  })

  test("an ascending scale stating no `black-at` still reaches black below its lowest rung", () => {
    expect(readoutRing({ reading: 39, scale: PLANT_GRAMS, unit: "whole" }).tier).toBe("black")
  })

  test("a rung takes the reading standing on it, so black beneath red at zero leaves zero red", () => {
    const blackUnderZero: ReadoutScale = { slug: "s", blackAt: -4, redAt: 0, yellowAt: 4 }
    expect(readoutRing({ reading: 0, scale: blackUnderZero, unit: "hours" }).tier).toBe("red")
    expect(readoutRing({ reading: -0.1, scale: blackUnderZero, unit: "hours" }).tier).toBe(
      "black"
    )
  })

  test("a reading past `black-at` has no further tier to fall to, so it sweeps no arc", () => {
    const blackUnderZero: ReadoutScale = { slug: "s", blackAt: -4, redAt: 0, yellowAt: 4 }
    expect(readoutRing({ reading: -40, scale: blackUnderZero, unit: "hours" })).toEqual({
      tier: "black",
      reading: "-40",
      nextTier: "red",
      progress: 0,
    })
  })
})

describe("readoutRing — a descending reading, where lower is better", () => {
  test.each([
    [0, "blue"],
    [1, "green"],
    [2, "yellow"],
    [3, "yellow"],
    [4, "red"],
    [10, "red"],
  ] as const)("%p open reads %s against 4/2/1/0", (open, tier) => {
    expect(readoutRing({ reading: open, scale: LIVE_COUNT, unit: "whole" }).tier).toBe(tier)
  })

  test("two of four open, halfway back toward one", () => {
    expect(readoutRing({ reading: 2, scale: LIVE_COUNT, unit: "whole" })).toEqual({
      tier: "yellow",
      reading: "2",
      nextTier: "green",
      progress: 0.5,
    })
  })

  test.each([
    [0, "blue"],
    [1, "yellow"],
    [9, "yellow"],
    [10, "red"],
    [99, "red"],
    [100, "black"],
    [250, "black"],
  ] as const)("%p waiting reads %s against black 100 / red 10 / yellow 1 / blue 0", (n, tier) => {
    expect(readoutRing({ reading: n, scale: DAILY_INBOX, unit: "whole" }).tier).toBe(tier)
  })
})

describe("readoutTierRing — orange, which only `backlog-count` states", () => {
  test.each([
    [0, "yellow"],
    [10, "yellow"],
    [11, "orange"],
    [20, "orange"],
    [21, "red"],
    [30, "red"],
    [31, "black"],
    [60, "black"],
  ] as const)("%p waiting reads %s against yellow 0 / orange 11 / red 21 / black 31", (n, tier) => {
    expect(readoutTierRing({ reading: n, scale: BACKLOG_COUNT, unit: "whole" }).tier).toBe(tier)
  })

  test("eleven waiting is one item into orange, nine tenths of the way back to yellow", () => {
    expect(readoutTierRing({ reading: 11, scale: BACKLOG_COUNT, unit: "whole" })).toEqual({
      tier: "orange",
      reading: "11",
      nextTier: "yellow",
      progress: 0.9,
    })
  })

  test("readoutRing refuses orange rather than drawing the neighbouring tier", () => {
    expect(() => readoutRing({ reading: 11, scale: BACKLOG_COUNT, unit: "whole" })).toThrow(
      /orange/
    )
  })
})

describe("readoutTierRing — the tier a scale awards for clearing rather than for the count", () => {
  test("a cleared inbox that refilled is green, not the yellow its count says", () => {
    expect(
      readoutTierRing({ reading: 5, scale: DAILY_INBOX, unit: "whole", earned: true })
    ).toEqual({ tier: "green", reading: "5", nextTier: null, progress: null })
  })

  test("a cleared inbox deep in the red is still green", () => {
    expect(
      readoutTierRing({ reading: 250, scale: DAILY_INBOX, unit: "whole", earned: true }).tier
    ).toBe("green")
  })

  test("an inbox standing at zero keeps blue, which is better than earned green", () => {
    expect(
      readoutTierRing({ reading: 0, scale: DAILY_INBOX, unit: "whole", earned: true })
    ).toEqual({ tier: "blue", reading: "0", nextTier: null, progress: null })
  })

  test("an inbox nobody cleared is drawn by its count alone", () => {
    expect(readoutTierRing({ reading: 5, scale: DAILY_INBOX, unit: "whole" })).toEqual(
      readoutTierRing({ reading: 5, scale: DAILY_INBOX, unit: "whole", earned: false })
    )
  })

  test("earning against a scale that awards nothing refuses", () => {
    expect(() =>
      readoutTierRing({ reading: 160, scale: PLANT_GRAMS, unit: "whole", earned: true })
    ).toThrow(/earned-color-slug/)
  })
})

const TIER_RANK: Readonly<Record<DailyTierColor, number>> = {
  black: 0,
  red: 1,
  yellow: 2,
  green: 3,
  blue: 4,
}

function arcOverruns(
  rings: readonly { tier: DailyTierColor; nextTier: DailyTierColor | null }[]
): readonly string[] {
  const found: string[] = []
  for (const ring of rings) {
    if (ring.nextTier === null) continue
    const climbed = TIER_RANK[ring.nextTier] - TIER_RANK[ring.tier]
    if (climbed > 1)
      found.push(`${ring.tier} ring drew a ${ring.nextTier} arc, ${climbed} tiers up`)
  }
  return found
}

describe("an arc never runs more than one tier above the ring it sits on", () => {
  test("a reading drawn against an ascending scale, wherever on it the reading falls", () => {
    const drawn = [-20, -1, 0, 0.5, 1, 40, 99, 100, 160, 199, 200, 400, 799, 800, 900, 3000].map(
      (reading) => readoutRing({ reading, scale: ACTIVITY_CALORIES, unit: "whole" })
    )
    expect(arcOverruns(drawn)).toEqual([])
  })
})
