import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const farri = {
  id: "01a0b70a-7bb6-757c-a49a-c5c906f20a80",
  type: "page-type/world-character",
  slug: "farri",
  title: "Farri Sightly",
  world: "world/the-wandering-inn",
  firstChapter: 374,
  lastChapter: 374,
  characterClaims: "jsonl",
  aliasOf: "world-character/farri-sightly",
} as const satisfies WorldCharacter
