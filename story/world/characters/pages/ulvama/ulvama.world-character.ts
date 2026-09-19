import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ulvama = {
  id: "01a06580-2495-7f68-a839-c88ba1cbc32f",
  type: "page-type/world-character",
  slug: "ulvama",
  title: "Ulvama",
  world: "world/the-wandering-inn",
  maxLevel: 39,
  eventCount: 10,
  firstChapter: 154,
  lastChapter: 805,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
