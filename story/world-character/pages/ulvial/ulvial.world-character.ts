import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ulvial = {
  id: "01a0b70d-80e0-7ed4-bdfb-8e2cfbd1592b",
  type: "page-type/world-character",
  slug: "ulvial",
  title: "Ulvial",
  world: "world/the-wandering-inn",
  firstChapter: 195,
  lastChapter: 195,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
