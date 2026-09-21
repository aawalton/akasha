import { summingBy } from "akasha/story/game/mechanic/modules/linear-stat/linear-stat.module.code.ts"

export const runMechanic = summingBy(
  [
    { of: "perception", by: 1 },
    { of: "finesse", by: 1 },
  ],
  0,
  "none"
)
