import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const kingRaelt = {
  id: "01a0b70b-6c86-7671-9842-8c167b2efba9",
  type: "page-type/world-character",
  slug: "king-raelt",
  title: "King Raelt",
  world: "world/the-wandering-inn",
  firstChapter: 398,
  lastChapter: 400,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
