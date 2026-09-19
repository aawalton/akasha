import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const farmerLupp = {
  id: "01a0b70a-7b7e-75ad-92c9-d1b7feb4c73f",
  type: "page-type/world-character",
  slug: "farmer-lupp",
  title: "Lupp",
  world: "world/the-wandering-inn",
  firstChapter: 336,
  lastChapter: 425,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
