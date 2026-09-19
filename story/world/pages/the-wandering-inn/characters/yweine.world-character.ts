import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const yweine = {
  id: "01a0b70d-e4e6-7a8b-856d-bfeadc878e28",
  type: "page-type/world-character",
  slug: "yweine",
  title: "Yweine",
  world: "world/the-wandering-inn",
  firstChapter: 824,
  lastChapter: 824,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
