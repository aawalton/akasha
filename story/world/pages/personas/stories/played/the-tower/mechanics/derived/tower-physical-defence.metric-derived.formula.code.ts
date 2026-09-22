import { summingBy } from "akasha/story/game/mechanic/modules/linear-stat/linear-stat.module.code.ts"
import { towerFinesse } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-finesse/tower-finesse.page-type.ts"
import { towerVitality } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-vitality/tower-vitality.page-type.ts"

export const worked = summingBy(
  [
    { of: towerVitality.slug, by: 0.5 },
    { of: towerFinesse.slug, by: 0.5 },
    { of: "armor.def", by: 1 },
  ],
  0,
  "none"
)
