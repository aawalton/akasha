import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const eliaArcsinger = {
  id: "01a06580-2494-7f7a-a218-4ade25153bf0",
  type: "page-type/world-character",
  slug: "elia-arcsinger",
  title: "Elia Arcsinger",
  world: "world/the-wandering-inn",
  maxLevel: 43,
  eventCount: 2,
  firstChapter: 236,
  lastChapter: 737,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
