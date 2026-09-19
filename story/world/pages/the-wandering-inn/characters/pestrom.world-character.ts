import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const pestrom = {
  id: "01a0b70c-68df-7c42-85d7-5511e7268a0a",
  type: "page-type/world-character",
  slug: "pestrom",
  title: "Pestrom",
  world: "world/the-wandering-inn",
  firstChapter: 42,
  lastChapter: 42,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
