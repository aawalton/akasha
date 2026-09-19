import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const kilkran = {
  id: "01a0b70b-6a59-79a7-9ff7-f2bdb447cf6c",
  type: "page-type/world-character",
  slug: "kilkran",
  title: "Kilkran",
  world: "world/the-wandering-inn",
  firstChapter: 382,
  lastChapter: 382,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
