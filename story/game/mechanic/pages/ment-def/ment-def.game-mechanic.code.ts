import { summingBy } from "akasha/story/game/mechanic/modules/linear-stat/linear-stat.module.code.ts"

export const runMechanic = summingBy(
  [
    { of: "will", by: 1.5 },
    { of: "intellect", by: 0.5 },
  ],
  0,
  "none"
)
