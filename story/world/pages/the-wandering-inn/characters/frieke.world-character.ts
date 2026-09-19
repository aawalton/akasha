import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const frieke = {
  id: "01a0b70a-8ce8-79ae-a27e-d3d18b7cb4f0",
  type: "page-type/world-character",
  slug: "frieke",
  title: "Frieke",
  world: "world/the-wandering-inn",
  firstChapter: 806,
  lastChapter: 809,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
