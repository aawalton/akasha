import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tessaShriekblade = {
  id: "01a0b70d-19eb-74b2-ada4-9b55ecc951d4",
  type: "page-type/world-character",
  slug: "tessa-shriekblade",
  title: "Tessa",
  world: "world/the-wandering-inn",
  firstChapter: 690,
  lastChapter: 690,
  characterClaims: "jsonl",
  aliasOf: "world-character/tessa-sharpclaw",
} as const satisfies WorldCharacter
