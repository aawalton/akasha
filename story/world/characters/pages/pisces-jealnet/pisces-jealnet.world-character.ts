import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const piscesJealnet = {
  id: "01a06580-2495-7150-bac5-aebe0fbe2cc0",
  type: "page-type/world-character",
  slug: "pisces-jealnet",
  title: "Pisces",
  world: "world/the-wandering-inn",
  maxLevel: 38,
  eventCount: 10,
  firstChapter: 375,
  lastChapter: 798,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
