import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-leveling.world-derived-metric.formula.code.ts"
import { towerLevel } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-level/tower-level.page-type.ts"

test("a climber at the first level has won no points", () => {
  expect(worked({ held: { [towerLevel.slug]: 1 } })).toEqual({ answered: 0 })
})

test("three attribute points come with each level won", () => {
  expect(worked({ held: { [towerLevel.slug]: 2 } })).toEqual({ answered: 3 })
  expect(worked({ held: { [towerLevel.slug]: 8 } })).toEqual({ answered: 21 })
})

test("a reading holding no level is refused", () => {
  expect(worked({ held: {} })).toHaveProperty("refused")
})
