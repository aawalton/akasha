import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mire = {
  id: "01a0b70b-ee8e-7bdb-bb75-decba0998f7f",
  type: "page-type/world-character",
  slug: "mire",
  title: "Mire",
  world: "world/the-wandering-inn",
  firstChapter: 449,
  lastChapter: 449,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
