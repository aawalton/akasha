import { expect, test } from "bun:test"
import { derivedIn } from "akasha/story/world/mechanics/derived/modules/derived-beside/derived-beside.module.code.ts"
import { towerHealthMax } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-health-max.world-derived-metric.ts"
import { towerPhysicalAttack } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/derived/tower-physical-attack.world-derived-metric.ts"
import { TOWER_WORKINGS } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/modules/tower-derived-beside/tower-derived-beside.module.code.ts"
import { towerFinesse } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-finesse/tower-finesse.page-type.ts"
import { towerMight } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-might/tower-might.page-type.ts"
import { towerVitality } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-vitality/tower-vitality.page-type.ts"
import { towerItemAttack } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-item-attack/tower-item-attack.page-type.ts"

test("the Tower's derived numbers are named by their pages' titles and worked by their formulas", () => {
  const derived = derivedIn(
    {
      [towerVitality.slug]: 12,
      [towerMight.slug]: 14,
      [towerFinesse.slug]: 14,
      [towerItemAttack.slug]: 10,
    },
    TOWER_WORKINGS
  )
  expect(derived[towerHealthMax.title]).toBe(124)
  expect(derived[towerPhysicalAttack.title]).toBe(45)
  expect(derivedIn({}, TOWER_WORKINGS)).toEqual({})
})
