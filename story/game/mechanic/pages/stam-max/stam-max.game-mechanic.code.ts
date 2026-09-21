import { summingBy } from "akasha/story/game/mechanic/modules/linear-stat/linear-stat.module.code.ts"

export const runMechanic = summingBy(
  [
    { of: "vitality", by: 4 },
    { of: "finesse", by: 2 },
  ],
  0,
  "nearest"
)
