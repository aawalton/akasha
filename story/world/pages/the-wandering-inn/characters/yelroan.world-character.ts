import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const yelroan = {
  id: "01a06580-2495-7302-ab80-d08ce5cf8470",
  type: "page-type/world-character",
  slug: "yelroan",
  title: "Yelroan",
  world: "world/the-wandering-inn",
  maxLevel: 46,
  eventCount: 3,
  firstChapter: 520,
  lastChapter: 732,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
