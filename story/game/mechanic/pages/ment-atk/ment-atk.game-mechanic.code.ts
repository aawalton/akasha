import { summingBy } from "akasha/story/game/mechanic/modules/linear-stat/linear-stat.module.code.ts"

export const runMechanic = summingBy(
  [
    { of: "intellect", by: 1.2 },
    { of: "will", by: 1 },
  ],
  0,
  "none"
)
