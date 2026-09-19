import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const barelle = {
  id: "01a0b707-79c7-7919-8210-e92a3a594a6c",
  type: "page-type/world-character",
  slug: "barelle",
  title: "Barelle",
  world: "world/the-wandering-inn",
  firstChapter: 671,
  lastChapter: 797,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
