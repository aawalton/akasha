import { describe, expect, test } from "bun:test"
import type { ResolvedReadout } from "./readout-resolver.ts"
import type { ReadoutScale } from "./readout-scale-shape.ts"
import { groupRing, upkeepStoplight } from "./upkeep-stoplights.ts"

const PLANT_SCALE: ReadoutScale = {
  slug: "readout-scale-plant-grams",
  redAt: 40,
  yellowAt: 80,
  greenAt: 160,
  blueAt: 320,
}

function readoutOf(
  slug: string,
  label: string,
  unit: string,
  scale: ReadoutScale,
  wireKey?: string
): ResolvedReadout {
  return {
    slug,
    label,
    unit,
    place: 1,
    scale,
    querySlug: "some-query",
    queryKey: null,
    earnedKey: null,
    wireKey: wireKey ?? slug,
    keyArgument: null,
    query: null,
  }
}

describe("`Every difference between readouts stands in data, not code`", () => {
  test("the key the shipped widget looks for is the one the readout states", () => {
    expect(
      groupRing(
        readoutOf(
          "upkeep-plants",
          "Plants",
          "grams",
          PLANT_SCALE,
          "plants"
        ),
        { reading: 180, earned: false }
      ).key
    ).toBe("plants")
  })

  test("a readout stating no key of its own answers to its slug", () => {
    expect(
      groupRing(readoutOf("readout-hygiene", "Hygiene", "green day units", PLANT_SCALE), {
        reading: 1,
        earned: false,
      }).key
    ).toBe("readout-hygiene")
  })

  test("the key a readout states is carried whatever its slug says", () => {
    expect(
      groupRing(
        readoutOf("readout-somewhere-else", "Tasks", "tasks", PLANT_SCALE, "temperTasks"),
        { reading: 1, earned: false }
      ).key
    ).toBe("temperTasks")
  })
})

describe("a circle takes its caption and its figure's shape from its own document", () => {
  test("the label drawn is the readout's label, never a word held here", () => {
    const drawn = upkeepStoplight(
      readoutOf("upkeep-plants", "Plants", "grams", PLANT_SCALE, "plants"),
      { reading: 180, earned: false }
    )
    expect(drawn.label).toBe("Plants")
    expect(drawn.habit).toBe("plants")
  })

  test("a measure counted in whole things draws whole, and thousands shorten", () => {
    const readout = readoutOf(
      "upkeep-activity",
      "Activity",
      "calories",
      PLANT_SCALE,
      "activity"
    )
    expect(upkeepStoplight(readout, { reading: 320, earned: false }).reading).toBe("320")
    expect(upkeepStoplight(readout, { reading: 1635, earned: false }).reading).toBe("1.6k")
  })

  test("a measure counted in hours draws a decimal place", () => {
    const readout = readoutOf(
      "upkeep-sleep",
      "Sleep",
      "hours",
      PLANT_SCALE,
      "sleep"
    )
    expect(upkeepStoplight(readout, { reading: 6.25, earned: false }).reading).toBe("6.3")
  })

  test("a day with no reading at all draws blank rather than a figure it does not have", () => {
    const drawn = upkeepStoplight(
      readoutOf("upkeep-plants", "Plants", "grams", PLANT_SCALE, "plants"),
      { reading: null, earned: false }
    )
    expect(drawn.tier).toBe("black")
    expect(drawn.nextTier).toBeNull()
    expect(drawn.progress).toBeNull()
  })
})
