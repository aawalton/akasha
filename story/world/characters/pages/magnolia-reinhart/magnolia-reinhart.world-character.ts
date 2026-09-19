import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const magnoliaReinhart = {
  id: "01a06580-2494-7d79-bc34-79f022266af0",
  type: "page-type/world-character",
  slug: "magnolia-reinhart",
  title: "Magnolia Reinhart",
  world: "world/the-wandering-inn",
  maxLevel: 57,
  eventCount: 3,
  firstChapter: 21,
  lastChapter: 812,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
