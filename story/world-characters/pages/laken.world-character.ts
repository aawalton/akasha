import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const laken = {
  id: "01a06580-2494-7c73-9a5c-51fec618b692",
  type: "world-character",
  slug: "laken",
  title: "Laken",
  world: "the-wandering-inn",
  maxLevel: 19,
  eventCount: 21,
  firstChapter: 125,
  lastChapter: 763,
} as const satisfies WorldCharacter
