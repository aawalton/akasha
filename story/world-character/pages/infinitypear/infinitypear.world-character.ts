import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const infinitypear = {
  id: "01a06580-2494-7d5e-aadc-57272bd10149",
  type: "page-type/world-character",
  slug: "infinitypear",
  title: "Infinitypear",
  world: "world/the-wandering-inn",
  maxLevel: 11,
  eventCount: 11,
  firstChapter: 521,
  lastChapter: 815,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
