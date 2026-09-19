import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const crossbowStan = {
  id: "01a0b70a-09f0-7c49-8c51-2f3c7a0433c8",
  type: "page-type/world-character",
  slug: "crossbow-stan",
  title: "Crossbow Stan",
  world: "world/the-wandering-inn",
  firstChapter: 329,
  lastChapter: 330,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
