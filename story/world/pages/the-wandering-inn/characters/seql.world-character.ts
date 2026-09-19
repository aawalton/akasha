import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const seql = {
  id: "01a0b70c-f2be-78cf-baa1-249d94eb65a6",
  type: "page-type/world-character",
  slug: "seql",
  title: "Seql",
  world: "world/the-wandering-inn",
  firstChapter: 456,
  lastChapter: 456,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
