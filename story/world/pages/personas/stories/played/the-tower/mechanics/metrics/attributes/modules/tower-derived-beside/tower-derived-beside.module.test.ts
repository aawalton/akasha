import { expect, test } from "bun:test"
import { towerHealthMax } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-health-max.world-derived-metric.ts"
import { towerPhysicalAttack } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-physical-attack.world-derived-metric.ts"
import {
  derivedIn,
  derivedShown,
  heldIn,
} from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/modules/tower-derived-beside/tower-derived-beside.module.code.ts"
import { towerFinesse } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-finesse/tower-finesse.page-type.ts"
import { towerMight } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-might/tower-might.page-type.ts"
import { towerVitality } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-vitality/tower-vitality.page-type.ts"
import { towerItemAttack } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-item-attack/tower-item-attack.page-type.ts"

test("the numbers held are summed by the page type each row is", () => {
  const held: Record<string, number> = { [towerItemAttack.slug]: 0 }
  heldIn(
    [
      { values: { type: towerItemAttack.slug, value: 10 } },
      { values: { type: towerItemAttack.slug, value: 2 } },
      { values: { type: towerMight.slug, value: "14" } },
    ],
    held
  )
  expect(held).toEqual({ [towerItemAttack.slug]: 12 })
})

test("a derived number is named by its page's title and left out where its formula refuses", () => {
  const derived = derivedIn({
    [towerVitality.slug]: 12,
    [towerMight.slug]: 14,
    [towerFinesse.slug]: 14,
    [towerItemAttack.slug]: 10,
  })
  expect(derived[towerHealthMax.title]).toBe(124)
  expect(derived[towerPhysicalAttack.title]).toBe(45)
  expect(derivedIn({})).toEqual({})
})

test("a read answering nothing falls back to what the sheet kept", () => {
  expect(derivedShown(null, { Health: 124 })).toEqual({ Health: 124 })
  expect(derivedShown({}, { Health: 124 })).toEqual({ Health: 124 })
  expect(derivedShown({ "Max Health": 124 }, { Health: 1 })).toEqual({ "Max Health": 124 })
})
