import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lawes = {
  id: "01a0b70b-7e5f-79aa-ae98-953fe92b737b",
  type: "page-type/world-character",
  slug: "lawes",
  title: "Lawes",
  world: "world/the-wandering-inn",
  firstChapter: 322,
  lastChapter: 322,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
