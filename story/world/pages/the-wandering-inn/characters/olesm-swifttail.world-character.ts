import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const olesmSwifttail = {
  id: "01a06580-2495-78a3-850a-8acddb6bbba8",
  type: "page-type/world-character",
  slug: "olesm-swifttail",
  title: "Olesm Swifttail",
  world: "world/the-wandering-inn",
  maxLevel: 33,
  eventCount: 2,
  firstChapter: 207,
  lastChapter: 599,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
