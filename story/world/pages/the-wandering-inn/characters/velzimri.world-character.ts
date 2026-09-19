import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const velzimri = {
  id: "01a0b70d-8bb8-7043-9dfc-af8a0d683def",
  type: "page-type/world-character",
  slug: "velzimri",
  title: "Velzimri",
  world: "world/the-wandering-inn",
  firstChapter: 581,
  lastChapter: 581,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
