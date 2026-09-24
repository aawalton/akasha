import { finesse } from "akasha/story/game/game-attribute/pages/finesse.game-attribute.ts"
import { perception } from "akasha/story/game/game-attribute/pages/perception.game-attribute.ts"
import { summingBy } from "akasha/story/game/game-mechanic/modules/linear-stat/linear-stat.module.code.ts"

export const runMechanic = summingBy(
  [
    { of: perception.slug, by: 1 },
    { of: finesse.slug, by: 1 },
  ],
  0,
  "none"
)
