import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const yvlon = {
  id: "01a06580-2495-7e40-9c6d-e2dbf8b8f5d9",
  type: "page-type/world-character",
  slug: "yvlon",
  title: "Yvlon",
  world: "world/the-wandering-inn",
  maxLevel: 45,
  eventCount: 15,
  firstChapter: 104,
  lastChapter: 104,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
