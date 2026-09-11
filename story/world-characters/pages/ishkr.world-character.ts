import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const ishkr = {
  id: "01a06580-2494-7ca8-bcb1-b2455a57c009",
  type: "world-character",
  slug: "ishkr",
  title: "Ishkr",
  world: "the-wandering-inn",
  maxLevel: 43,
  eventCount: 7,
  firstChapter: 764,
  lastChapter: 764,
} as const satisfies WorldCharacter
