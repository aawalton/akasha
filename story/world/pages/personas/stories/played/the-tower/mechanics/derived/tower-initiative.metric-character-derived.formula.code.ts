import { summingBy } from "akasha/story/game/game-mechanic/modules/linear-stat/linear-stat.module.code.ts"
import { towerFinesse } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-finesse/tower-finesse.page-type.ts"
import { towerPerception } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-perception/tower-perception.page-type.ts"

export const worked = summingBy(
  [
    { of: towerPerception.slug, by: 1 },
    { of: towerFinesse.slug, by: 1 },
  ],
  0,
  "none"
)
