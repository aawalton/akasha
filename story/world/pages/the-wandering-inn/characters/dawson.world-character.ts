import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const dawson = {
  id: "01a0b70a-13b9-76f5-ae25-aa0c5e1d497b",
  type: "page-type/world-character",
  slug: "dawson",
  title: "Dawson",
  world: "world/the-wandering-inn",
  firstChapter: 316,
  lastChapter: 316,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
