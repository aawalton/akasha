import { summingBy } from "akasha/story/game/game-mechanic/modules/linear-stat/linear-stat.module.code.ts"
import { towerIntellect } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-intellect/tower-intellect.page-type.ts"
import { towerWill } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-will/tower-will.page-type.ts"

export const worked = summingBy(
  [
    { of: towerWill.slug, by: 1.5 },
    { of: towerIntellect.slug, by: 0.5 },
  ],
  0,
  "none"
)
