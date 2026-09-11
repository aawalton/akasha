import type { WorldCharacter } from "akasha/story/world-characters/world-character.page-type.types.ts"

export const nailrenFletchsing = {
  id: "01a06580-2495-70a5-b00c-928a3514de10",
  type: "world-character",
  slug: "nailren-fletchsing",
  title: "Nailren Fletchsing",
  world: "the-wandering-inn",
  maxLevel: 7,
  eventCount: 6,
  firstChapter: 768,
  lastChapter: 768,
} as const satisfies WorldCharacter
