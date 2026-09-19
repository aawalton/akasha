import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const foliana = {
  id: "01a0b70a-8b94-7977-8b4b-022ff26a301e",
  type: "page-type/world-character",
  slug: "foliana",
  title: "Foliana",
  world: "world/the-wandering-inn",
  firstChapter: 207,
  lastChapter: 802,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
