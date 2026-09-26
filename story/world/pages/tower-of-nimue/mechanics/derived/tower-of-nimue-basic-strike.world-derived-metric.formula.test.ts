import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/tower-of-nimue/mechanics/derived/tower-of-nimue-basic-strike.world-derived-metric.formula.code.ts"
import { towerOfNimuePwr } from "akasha/story/world/pages/tower-of-nimue/stories/written/tower-of-nimue/mechanics/metrics/attributes/pwr/tower-of-nimue-pwr.page-type.ts"

test("PWR ten makes a basic strike of twenty", () => {
  const held = { [towerOfNimuePwr.slug]: 10 }
  expect(worked({ held })).toEqual({ answered: 20 })
})

test("a reading missing PWR is refused rather than summed", () => {
  expect(worked({ held: {} })).toHaveProperty("refused")
})
