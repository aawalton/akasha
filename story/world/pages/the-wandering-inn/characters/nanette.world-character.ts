import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nanette = {
  id: "01a06580-2495-7115-8b91-58a7fc039e4b",
  type: "page-type/world-character",
  slug: "nanette",
  title: "Nanette",
  world: "world/the-wandering-inn",
  maxLevel: 4,
  eventCount: 14,
  firstChapter: 351,
  lastChapter: 812,
  characterClaims: "jsonl",
  aliasOf: "world-character/nanette-weishart",
} as const satisfies WorldCharacter
