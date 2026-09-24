import type { GameTurn } from "akasha/story/game/game-turn/game-turn.page-type.types.ts"

export const theTower088 = {
  id: "01a0c686-1cbd-770e-af0c-2594765fca54",
  type: "page-type/game-turn",
  slug: "the-tower-088",
  game: "story-game/the-tower",
  number: 88,
  pools: [
    { name: "hp", now: 121, most: 124 },
    { name: "focus", now: 104, most: 120, change: -6 },
    { name: "stamina", now: 48, most: 76, change: -5 },
  ],
  derived: [
    { name: "Vitae (HP)", number: 124 },
    { name: "Focus", number: 120 },
    { name: "Stamina", number: 76 },
    { name: "Initiative", number: 26 },
  ],
  rungs: [
    { name: "Ember Channel", rung: "Apprentice" },
    { name: "Ember Burst", rung: "Apprentice" },
    { name: "Essence Infusion", rung: "Apprentice" },
    { name: "Ember Wave", rung: "Novice" },
    { name: "Ember Siphon", rung: "Apprentice" },
    { name: "Ember-Tempered Body", rung: "Apprentice" },
    { name: "Smithing", rung: "Apprentice" },
  ],
} as const satisfies GameTurn
