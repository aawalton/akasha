import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const yvlon = {
  id: "01a06580-2495-7e40-9c6d-e2dbf8b8f5d9",
  type: "world-character",
  slug: "yvlon",
  title: "Yvlon",
  world: "the-wandering-inn",
  maxLevel: 45,
  eventCount: 15,
  firstChapter: 385,
  lastChapter: 733,
} as const satisfies WorldCharacter
