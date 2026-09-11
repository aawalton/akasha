import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const ceriaSpringwalker = {
  id: "01a06580-2494-7ec7-be55-4ecdfa65a541",
  type: "world-character",
  slug: "ceria-springwalker",
  title: "Ceria",
  world: "the-wandering-inn",
  maxLevel: 40,
  eventCount: 23,
  firstChapter: 506,
  lastChapter: 735,
} as const satisfies WorldCharacter
