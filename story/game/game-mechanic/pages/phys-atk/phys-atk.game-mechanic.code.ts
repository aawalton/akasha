import { finesse } from "akasha/story/game/game-attribute/pages/finesse.game-attribute.ts"
import { might } from "akasha/story/game/game-attribute/pages/might.game-attribute.ts"
import { summingBy } from "akasha/story/game/game-mechanic/modules/linear-stat/linear-stat.module.code.ts"

export const runMechanic = summingBy(
  [
    { of: might.slug, by: 1.5 },
    { of: finesse.slug, by: 1 },
    { of: "weapon.atk", by: 1 },
  ],
  0,
  "none"
)
