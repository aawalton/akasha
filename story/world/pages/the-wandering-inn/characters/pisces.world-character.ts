import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const pisces = {
  id: "01a06580-2495-755b-839a-22cd62d57e6a",
  type: "page-type/world-character",
  slug: "pisces",
  title: "Pisces",
  world: "world/the-wandering-inn",
  eventCount: 1,
  firstChapter: 9,
  lastChapter: 797,
  characterClaims: "jsonl",
  aliasOf: "world-character/pisces-jealnet",
} as const satisfies WorldCharacter
