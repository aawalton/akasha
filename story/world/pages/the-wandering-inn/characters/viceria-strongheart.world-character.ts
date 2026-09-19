import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const viceriaStrongheart = {
  id: "01a0b70d-938a-7dec-84c4-ea14dd2c56c1",
  type: "page-type/world-character",
  slug: "viceria-strongheart",
  title: "Viceria Strongheart",
  world: "world/the-wandering-inn",
  firstChapter: 401,
  lastChapter: 401,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
