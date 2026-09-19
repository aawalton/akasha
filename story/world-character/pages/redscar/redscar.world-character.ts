import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const redscar = {
  id: "01a06580-2495-7996-88ea-047d800a97c1",
  type: "page-type/world-character",
  slug: "redscar",
  title: "Redscar",
  world: "world/the-wandering-inn",
  maxLevel: 52,
  eventCount: 4,
  firstChapter: 155,
  lastChapter: 760,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
