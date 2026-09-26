import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/tower-of-nimue/mechanics/derived/tower-of-nimue-focus.world-derived-metric.formula.code.ts"
import { towerOfNimueAtt } from "akasha/story/world/pages/tower-of-nimue/stories/written/tower-of-nimue/mechanics/metrics/attributes/att/tower-of-nimue-att.page-type.ts"

test("ATT twelve makes sixty Focus", () => {
  const held = { [towerOfNimueAtt.slug]: 12 }
  expect(worked({ held })).toEqual({ answered: 60 })
})

test("a reading missing ATT is refused rather than summed", () => {
  expect(worked({ held: {} })).toHaveProperty("refused")
})
