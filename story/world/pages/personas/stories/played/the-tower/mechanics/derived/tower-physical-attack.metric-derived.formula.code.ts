import { summingBy } from "akasha/story/game/mechanic/modules/linear-stat/linear-stat.module.code.ts"
import { towerFinesse } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-finesse/tower-finesse.page-type.ts"
import { towerMight } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/attributes/tower-might/tower-might.page-type.ts"

export const worked = summingBy(
  [
    { of: towerMight.slug, by: 1.5 },
    { of: towerFinesse.slug, by: 1 },
    { of: "weapon.atk", by: 1 },
  ],
  0,
  "none"
)
