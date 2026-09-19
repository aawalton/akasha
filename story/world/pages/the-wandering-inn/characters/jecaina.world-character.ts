import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const jecaina = {
  id: "01a06580-2494-70b5-ba9c-d071203e5e01",
  type: "page-type/world-character",
  slug: "jecaina",
  title: "Jecaina",
  world: "world/the-wandering-inn",
  maxLevel: 29,
  eventCount: 8,
  firstChapter: 326,
  lastChapter: 586,
  characterClaims: "jsonl",
  aliasOf: "world-character/jecaina-leysars",
} as const satisfies WorldCharacter
