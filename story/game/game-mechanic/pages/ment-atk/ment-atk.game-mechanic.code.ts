import { intellect } from "akasha/story/game/game-attribute/pages/intellect.game-attribute.ts"
import { will } from "akasha/story/game/game-attribute/pages/will.game-attribute.ts"
import { summingBy } from "akasha/story/game/game-mechanic/modules/linear-stat/linear-stat.module.code.ts"

export const runMechanic = summingBy(
  [
    { of: intellect.slug, by: 1.2 },
    { of: will.slug, by: 1 },
  ],
  0,
  "none"
)
