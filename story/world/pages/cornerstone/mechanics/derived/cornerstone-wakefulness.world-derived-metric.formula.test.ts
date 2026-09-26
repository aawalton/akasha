import { expect, test } from "bun:test"
import { worked } from "akasha/story/world/pages/cornerstone/mechanics/derived/cornerstone-wakefulness.world-derived-metric.formula.code.ts"
import { cornerstoneMemory } from "akasha/story/world/pages/cornerstone/stories/written/cornerstone/mechanics/metrics/attributes/memory/cornerstone-memory.page-type.ts"
import { cornerstoneProvision } from "akasha/story/world/pages/cornerstone/stories/written/cornerstone/mechanics/metrics/attributes/provision/cornerstone-provision.page-type.ts"
import { cornerstoneReach } from "akasha/story/world/pages/cornerstone/stories/written/cornerstone/mechanics/metrics/attributes/reach/cornerstone-reach.page-type.ts"
import { cornerstoneSight } from "akasha/story/world/pages/cornerstone/stories/written/cornerstone/mechanics/metrics/attributes/sight/cornerstone-sight.page-type.ts"
import { cornerstoneTouch } from "akasha/story/world/pages/cornerstone/stories/written/cornerstone/mechanics/metrics/attributes/touch/cornerstone-touch.page-type.ts"
import { cornerstoneWarmth } from "akasha/story/world/pages/cornerstone/stories/written/cornerstone/mechanics/metrics/attributes/warmth/cornerstone-warmth.page-type.ts"

test("Touch alone at one makes a Wakefulness of one", () => {
  const held = {
    [cornerstoneTouch.slug]: 1,
    [cornerstoneSight.slug]: 0,
    [cornerstoneWarmth.slug]: 0,
    [cornerstoneProvision.slug]: 0,
    [cornerstoneMemory.slug]: 0,
    [cornerstoneReach.slug]: 0,
  }
  expect(worked({ held })).toEqual({ answered: 1 })
})

test("every Faculty at its deepest makes twenty-eight", () => {
  const held = {
    [cornerstoneTouch.slug]: 3,
    [cornerstoneSight.slug]: 5,
    [cornerstoneWarmth.slug]: 5,
    [cornerstoneProvision.slug]: 5,
    [cornerstoneMemory.slug]: 5,
    [cornerstoneReach.slug]: 5,
  }
  expect(worked({ held })).toEqual({ answered: 28 })
})

test("a reading missing a Faculty is refused rather than summed", () => {
  const held = { [cornerstoneTouch.slug]: 1 }
  expect(worked({ held })).toHaveProperty("refused")
})
