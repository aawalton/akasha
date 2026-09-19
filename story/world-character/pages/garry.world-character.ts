import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const garry = {
  id: "01a06580-2494-7e3f-986c-3f39b2b99338",
  type: "page-type/world-character",
  slug: "garry",
  title: "Garry",
  world: "world/the-wandering-inn",
  maxLevel: 46,
  eventCount: 39,
  firstChapter: 175,
  lastChapter: 805,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
