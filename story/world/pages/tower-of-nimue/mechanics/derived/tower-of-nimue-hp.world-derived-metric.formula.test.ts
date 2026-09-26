import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/tower-of-nimue/mechanics/derived/tower-of-nimue-hp.world-derived-metric.formula.code.ts"
import { towerOfNimueVit } from "akasha/story/world/pages/tower-of-nimue/stories/written/tower-of-nimue/mechanics/metrics/attributes/vit/tower-of-nimue-vit.page-type.ts"

test("VIT ten makes a hundred HP", () => {
  const held = { [towerOfNimueVit.slug]: 10 }
  expect(worked({ held })).toEqual({ answered: 100 })
})

test("a reading missing VIT is refused rather than summed", () => {
  expect(worked({ held: {} })).toHaveProperty("refused")
})
