import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const menolit = {
  id: "01a0b70b-e69b-7cdf-aa26-23f5d756d7ff",
  type: "page-type/world-character",
  slug: "menolit",
  title: "Menolit",
  world: "world/the-wandering-inn",
  firstChapter: 411,
  lastChapter: 650,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
