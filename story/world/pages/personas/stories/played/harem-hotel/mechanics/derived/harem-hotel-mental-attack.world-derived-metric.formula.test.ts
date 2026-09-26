import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-mental-attack.world-derived-metric.formula.code.ts"
import { haremHotelIntellect } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/intellect/harem-hotel-intellect.page-type.ts"
import { haremHotelWill } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/will/harem-hotel-will.page-type.ts"

test("intellect ten and will eighteen make thirty", () => {
  const held = { [haremHotelIntellect.slug]: 10, [haremHotelWill.slug]: 18 }
  expect(worked({ held })).toEqual({ answered: 30 })
})

test("Alan's intellect and will, both eighteen, make near forty and are not rounded", () => {
  const said = worked({ held: { [haremHotelIntellect.slug]: 18, [haremHotelWill.slug]: 18 } })
  if (!("answered" in said)) throw new Error(said.refused)
  expect(said.answered).toBeCloseTo(39.6)
})

test("a reading missing an attribute is refused rather than summed", () => {
  const held = { [haremHotelWill.slug]: 18 }
  expect(worked({ held })).toHaveProperty("refused")
})
