import { describe, expect, test } from "bun:test"
import {
  type ReadoutScale,
  readoutCircle,
  readoutLadder,
  readoutShape,
  readoutTierCircle,
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

describe("readoutCircle — an ascending reading drawn against a resolved scale", () => {
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
    expect(readoutCircle({ reading: grams, scale: PLANT_GRAMS, unit: "whole" }).tier).toBe(tier)
  })

  test("the Plants circle as the documents draw it on a 160g day", () => {
    expect(readoutCircle({ reading: 160, scale: PLANT_GRAMS, unit: "whole" })).toEqual({
      tier: "green",
      reading: "160",
      nextTier: "blue",
      progress: 0,
    })
  })

  test("moving green-at on the scale moves the tier, which is the whole point", () => {
    const raised: ReadoutScale = { ...PLANT_GRAMS, greenAt: 200 }
    expect(readoutCircle({ reading: 160, scale: raised, unit: "whole" })).toEqual({
      tier: "yellow",
      reading: "160",
      nextTier: "green",
      progress: (160 - 80) / (200 - 80),
    })
  })

  test("`unit` here is the formatting mode, never the readout's grams", () => {
    expect(readoutCircle({ reading: 160, scale: PLANT_GRAMS, unit: "hours" }).reading).toBe("160")
    expect(readoutCircle({ reading: 7.5, scale: PLANT_GRAMS, unit: "hours" }).reading).toBe("7.5")
    expect(readoutCircle({ reading: 7.5, scale: PLANT_GRAMS, unit: "whole" }).reading).toBe("8")
  })
})

describe("readoutCircle — `black-at` puts black somewhere other than zero", () => {
  test.each([
    [-20, "black"],
    [-12, "black"],
    [-10, "black"],
    [-8, "red"],
    [-4, "yellow"],
    [0, "green"],
    [4, "blue"],
  ] as const)("%p surplus hours reads %s", (hours, tier) => {
    expect(readoutCircle({ reading: hours, scale: SURPLUS_HOURS, unit: "hours" }).tier).toBe(tier)
  })

  test("progress runs from `black-at` rather than from zero", () => {
    expect(readoutCircle({ reading: -10, scale: SURPLUS_HOURS, unit: "hours" })).toEqual({
      tier: "black",
      reading: "-10",
      nextTier: "red",
      progress: 0.5,
    })
  })

  test("an ascending scale stating no `black-at` still reaches black below its lowest rung", () => {
    expect(readoutCircle({ reading: 39, scale: PLANT_GRAMS, unit: "whole" }).tier).toBe("black")
  })

  test("a rung takes the reading standing on it, so black beneath red at zero leaves zero red", () => {
    const blackUnderZero: ReadoutScale = { slug: "s", blackAt: -4, redAt: 0, yellowAt: 4 }
    expect(readoutCircle({ reading: 0, scale: blackUnderZero, unit: "hours" }).tier).toBe("red")
    expect(readoutCircle({ reading: -0.1, scale: blackUnderZero, unit: "hours" }).tier).toBe(
      "black"
    )
  })

  test("a reading past `black-at` has no further tier to fall to, so it sweeps no arc", () => {
    const blackUnderZero: ReadoutScale = { slug: "s", blackAt: -4, redAt: 0, yellowAt: 4 }
    expect(readoutCircle({ reading: -40, scale: blackUnderZero, unit: "hours" })).toEqual({
      tier: "black",
      reading: "-40",
      nextTier: "red",
      progress: 0,
    })
  })
})

describe("readoutCircle — a descending reading, where lower is better", () => {
  test.each([
    [0, "blue"],
    [1, "green"],
    [2, "yellow"],
    [3, "yellow"],
    [4, "red"],
    [10, "red"],
  ] as const)("%p open reads %s against 4/2/1/0", (open, tier) => {
    expect(readoutCircle({ reading: open, scale: LIVE_COUNT, unit: "whole" }).tier).toBe(tier)
  })

  test("two of four open, halfway back toward one", () => {
    expect(readoutCircle({ reading: 2, scale: LIVE_COUNT, unit: "whole" })).toEqual({
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
    expect(readoutCircle({ reading: n, scale: DAILY_INBOX, unit: "whole" }).tier).toBe(tier)
  })
})

describe("readoutTierCircle — orange, which only `backlog-count` states", () => {
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
    expect(readoutTierCircle({ reading: n, scale: BACKLOG_COUNT, unit: "whole" }).tier).toBe(tier)
  })

  test("eleven waiting is one item into orange, nine tenths of the way back to yellow", () => {
    expect(readoutTierCircle({ reading: 11, scale: BACKLOG_COUNT, unit: "whole" })).toEqual({
      tier: "orange",
      reading: "11",
      nextTier: "yellow",
      progress: 0.9,
    })
  })

  test("readoutCircle refuses orange rather than drawing the neighbouring tier", () => {
    expect(() => readoutCircle({ reading: 11, scale: BACKLOG_COUNT, unit: "whole" })).toThrow(
      /orange/
    )
  })
})

describe("readoutTierCircle — the tier a scale awards for clearing rather than for the count", () => {
  test("a cleared inbox that refilled is green, not the yellow its count says", () => {
    expect(
      readoutTierCircle({ reading: 5, scale: DAILY_INBOX, unit: "whole", earned: true })
    ).toEqual({ tier: "green", reading: "5", nextTier: null, progress: null })
  })

  test("a cleared inbox deep in the red is still green", () => {
    expect(
      readoutTierCircle({ reading: 250, scale: DAILY_INBOX, unit: "whole", earned: true }).tier
    ).toBe("green")
  })

  test("an inbox standing at zero keeps blue, which is better than earned green", () => {
    expect(
      readoutTierCircle({ reading: 0, scale: DAILY_INBOX, unit: "whole", earned: true })
    ).toEqual({ tier: "blue", reading: "0", nextTier: null, progress: null })
  })

  test("an inbox nobody cleared is drawn by its count alone", () => {
    expect(readoutTierCircle({ reading: 5, scale: DAILY_INBOX, unit: "whole" })).toEqual(
      readoutTierCircle({ reading: 5, scale: DAILY_INBOX, unit: "whole", earned: false })
    )
  })

  test("earning against a scale that awards nothing refuses", () => {
    expect(() =>
      readoutTierCircle({ reading: 160, scale: PLANT_GRAMS, unit: "whole", earned: true })
    ).toThrow(/earned-color-slug/)
  })
})
