import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const deskie = {
  id: "01a0b70a-18a9-7e40-88fa-2f4cbdd7ccbb",
  type: "page-type/world-character",
  slug: "deskie",
  title: "Deskie",
  world: "world/the-wandering-inn",
  firstChapter: 711,
  lastChapter: 711,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
