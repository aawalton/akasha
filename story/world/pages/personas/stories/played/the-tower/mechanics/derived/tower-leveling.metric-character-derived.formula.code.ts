import { summingBy } from "akasha/story/world/mechanics/modules/linear-stat/linear-stat.module.code.ts"
import { towerLevel } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-level/tower-level.page-type.ts"

const POINTS_PER_LEVEL = 3
const FIRST_LEVEL = 1

export const worked = summingBy(
  [{ of: towerLevel.slug, by: POINTS_PER_LEVEL }],
  -FIRST_LEVEL * POINTS_PER_LEVEL,
  "none"
)
