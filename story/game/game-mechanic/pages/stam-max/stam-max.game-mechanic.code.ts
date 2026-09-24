import { finesse } from "akasha/story/game/game-attribute/pages/finesse.game-attribute.ts"
import { vitality } from "akasha/story/game/game-attribute/pages/vitality.game-attribute.ts"
import { summingBy } from "akasha/story/game/game-mechanic/modules/linear-stat/linear-stat.module.code.ts"

export const runMechanic = summingBy(
  [
    { of: vitality.slug, by: 4 },
    { of: finesse.slug, by: 2 },
  ],
  0,
  "nearest"
)
