import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const gilam = {
  id: "01a0b70a-9d50-735d-b2b1-db4f229aac61",
  type: "page-type/world-character",
  slug: "gilam",
  title: "Gilam",
  world: "world/the-wandering-inn",
  firstChapter: 290,
  lastChapter: 290,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
