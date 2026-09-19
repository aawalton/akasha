import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const inreza = {
  id: "01a06580-2494-7057-b378-6b3b02a9da5c",
  type: "page-type/world-character",
  slug: "inreza",
  title: "Inreza",
  world: "world/the-wandering-inn",
  maxLevel: 61,
  eventCount: 1,
  firstChapter: 543,
  lastChapter: 669,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
