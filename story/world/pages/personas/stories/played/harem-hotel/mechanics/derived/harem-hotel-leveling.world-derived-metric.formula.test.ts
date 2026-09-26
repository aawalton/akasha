import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-leveling.world-derived-metric.formula.code.ts"
import { haremHotelLevel } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/level/harem-hotel-level.page-type.ts"

test("a character at the first level has won no points", () => {
  expect(worked({ held: { [haremHotelLevel.slug]: 1 } })).toEqual({ answered: 0 })
})

test("Alan at the second level has won three points", () => {
  expect(worked({ held: { [haremHotelLevel.slug]: 2 } })).toEqual({ answered: 3 })
})

test("a reading holding no level is refused", () => {
  expect(worked({ held: {} })).toHaveProperty("refused")
})
