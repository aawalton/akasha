import { summingBy } from "akasha/story/game/mechanic/modules/linear-stat/linear-stat.module.code.ts"

export const runMechanic = summingBy(
  [
    { of: "intellect", by: 4 },
    { of: "will", by: 2 },
  ],
  0,
  "nearest"
)
