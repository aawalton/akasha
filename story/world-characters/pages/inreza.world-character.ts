import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const inreza = {
  id: "01a06580-2494-7057-b378-6b3b02a9da5c",
  type: "world-character",
  slug: "inreza",
  title: "Inreza",
  world: "the-wandering-inn",
  maxLevel: 61,
  eventCount: 1,
  firstChapter: 669,
  lastChapter: 669,
} as const satisfies WorldCharacter
