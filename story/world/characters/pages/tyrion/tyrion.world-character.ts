import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const tyrion = {
  id: "01a06580-2495-7bbd-ab01-957ce84b8c7f",
  type: "page-type/world-character",
  slug: "tyrion",
  title: "Tyrion Veltras",
  world: "world/the-wandering-inn",
  maxLevel: 34,
  eventCount: 11,
  firstChapter: 183,
  lastChapter: 656,
  characterClaims: "jsonl",
  aliasOf: "world-character/tyrion-veltras",
} as const satisfies WorldCharacter
