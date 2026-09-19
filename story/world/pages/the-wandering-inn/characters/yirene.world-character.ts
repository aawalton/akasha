import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const yirene = {
  id: "01a0b70d-dd24-72df-b0bd-93a4e1279bd3",
  type: "page-type/world-character",
  slug: "yirene",
  title: "Yirene",
  world: "world/the-wandering-inn",
  firstChapter: 809,
  lastChapter: 809,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
