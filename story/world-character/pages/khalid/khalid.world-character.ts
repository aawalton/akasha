import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const khalid = {
  id: "01a0b70b-68e0-7db4-a437-ac75e013b2b3",
  type: "page-type/world-character",
  slug: "khalid",
  title: "Khalid",
  world: "world/the-wandering-inn",
  firstChapter: 323,
  lastChapter: 370,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
