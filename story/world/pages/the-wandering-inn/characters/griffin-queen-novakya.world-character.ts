import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const griffinQueenNovakya = {
  id: "01a0b70a-ebf3-7f2f-8096-28e25d2bb94e",
  type: "page-type/world-character",
  slug: "griffin-queen-novakya",
  title: "Novakya",
  world: "world/the-wandering-inn",
  firstChapter: 360,
  lastChapter: 360,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
