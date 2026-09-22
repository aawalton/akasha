import type { GameTurn } from "akasha/story/game/turn/game-turn.page-type.types.ts"

export const partners032 = {
  id: "01a0c6ab-6c80-7bd5-acc7-7d9e4fff7c31",
  type: "page-type/game-turn",
  slug: "partners-032",
  game: "game/partners",
  number: 32,
  pools: [
    { name: "hp", now: 22, most: 22 },
    { name: "focus", now: 23, most: 23 },
    { name: "stamina", now: 21, most: 21 },
  ],
  derived: [
    { name: "Stamina", number: 21 },
    { name: "Experience", number: 155 },
    { name: "Vitality (HP)", number: 22 },
    { name: "Essence (Focus)", number: 23 },
  ],
  rungs: [
    { name: "Patternwork", rung: "Rank 2" },
    { name: "Even Keel", rung: "Rank 2" },
    { name: "Appraisal", rung: "Rank 1" },
  ],
} as const satisfies GameTurn
