import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ceriaSpringwalker = {
  id: "01a06580-2494-7ec7-be55-4ecdfa65a541",
  type: "page-type/world-character",
  slug: "ceria-springwalker",
  title: "Ceria Springwalker",
  world: "world/the-wandering-inn",
  maxLevel: 40,
  eventCount: 23,
  firstChapter: 35,
  lastChapter: 798,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
