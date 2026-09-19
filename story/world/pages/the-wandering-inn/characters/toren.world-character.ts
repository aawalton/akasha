import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const toren = {
  id: "01a06580-2495-7b2b-ab5a-0bb2b2fc4657",
  type: "page-type/world-character",
  slug: "toren",
  title: "Toren",
  world: "world/the-wandering-inn",
  maxLevel: 47,
  eventCount: 56,
  firstChapter: 49,
  lastChapter: 772,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
