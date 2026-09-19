import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const briganda = {
  id: "01a06580-2494-7c23-8934-771d62c0cda5",
  type: "page-type/world-character",
  slug: "briganda",
  title: "Briganda",
  world: "world/the-wandering-inn",
  maxLevel: 34,
  eventCount: 3,
  firstChapter: 413,
  lastChapter: 413,
  characterClaims: "jsonl",
  aliasOf: "world-character/briganda-rishaw",
} as const satisfies WorldCharacter
