import { summingBy } from "akasha/story/game/mechanic/modules/linear-stat/linear-stat.module.code.ts"
import { towerFinesse } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-finesse/tower-finesse.page-type.ts"
import { towerVitality } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-vitality/tower-vitality.page-type.ts"
import { towerItemDefence } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-item-defence/tower-item-defence.page-type.ts"

export const worked = summingBy(
  [
    { of: towerVitality.slug, by: 0.5 },
    { of: towerFinesse.slug, by: 0.5 },
    { of: towerItemDefence.slug, by: 1 },
  ],
  0,
  "none"
)
