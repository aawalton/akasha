import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const milka = {
  id: "01a0b70b-ebdb-7782-b907-2e4747257aeb",
  type: "page-type/world-character",
  slug: "milka",
  title: "Milka",
  world: "world/the-wandering-inn",
  firstChapter: 345,
  lastChapter: 345,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
