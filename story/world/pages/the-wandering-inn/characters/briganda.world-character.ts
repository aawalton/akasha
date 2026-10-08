import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const briganda = {
  id: "01a06580-2494-7c23-8934-771d62c0cda5",
  type: "page-type/world-character",
  slug: "briganda",
  title: "Briganda",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  eventCount: 3,
  firstChapter: 413,
  lastChapter: 413,
  characterClaims: "jsonl",
  aliasOf: "world-character/briganda-rishaw",
  createdAt: "2026-09-03T04:21:31.924Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
