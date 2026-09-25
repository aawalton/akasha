import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nailrenFletchsing = {
  id: "01a06580-2495-70a5-b00c-928a3514de10",
  type: "page-type/world-character",
  slug: "nailren-fletchsing",
  title: "Nailren Fletchsing",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  eventCount: 6,
  firstChapter: 768,
  lastChapter: 768,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
