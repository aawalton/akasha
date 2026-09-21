import { summingBy } from "akasha/story/game/mechanic/modules/linear-stat/linear-stat.module.code.ts"

export const runMechanic = summingBy(
  [
    { of: "vitality", by: 0.5 },
    { of: "finesse", by: 0.5 },
    { of: "armor.def", by: 1 },
  ],
  0,
  "none"
)
