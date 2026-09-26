import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/derived/harem-hotel-initiative.world-derived-metric.formula.code.ts"
import { haremHotelFinesse } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/finesse/harem-hotel-finesse.page-type.ts"
import { haremHotelPerception } from "akasha/story/world/pages/personas/stories/played/harem-hotel/mechanics/metrics/attributes/perception/harem-hotel-perception.page-type.ts"

test("perception twelve and finesse fifteen make twenty seven, as Alan's initiative stands", () => {
  const held = { [haremHotelPerception.slug]: 12, [haremHotelFinesse.slug]: 15 }
  expect(worked({ held })).toEqual({ answered: 27 })
})

test("a reading missing an attribute is refused rather than summed", () => {
  const held = { [haremHotelPerception.slug]: 12 }
  expect(worked({ held })).toHaveProperty("refused")
})
