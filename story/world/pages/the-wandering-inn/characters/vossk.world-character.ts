import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const vossk = {
  id: "01a0b70d-97b9-77c2-a90e-de4a4c13a425",
  type: "page-type/world-character",
  slug: "vossk",
  title: "Vossk",
  world: "world/the-wandering-inn",
  firstChapter: 698,
  lastChapter: 698,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
