import type { GameTurn } from "akasha/story/game/game-turn/game-turn.page-type.types.ts"

export const partnersIi002 = {
  id: "01a0c6ab-738d-7ecf-ad96-a3354db1ba45",
  type: "page-type/game-turn",
  slug: "partners-ii-002",
  game: "story-game/partners-ii",
  number: 2,
  pools: [
    { name: "hp", now: 22, most: 22 },
    { name: "focus", now: 23, most: 23 },
    { name: "stamina", now: 21, most: 21 },
  ],
  derived: [
    { name: "Stamina", number: 21 },
    { name: "Vitality (HP)", number: 22 },
    { name: "Essence (Focus)", number: 23 },
  ],
  rungs: [
    { name: "Patternwork", rung: "Rank 2" },
    { name: "Even Keel", rung: "Rank 2" },
    { name: "Appraisal", rung: "Rank 1" },
  ],
} as const satisfies GameTurn
