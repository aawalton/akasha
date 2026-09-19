import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tessaSharpclaw = {
  id: "01a0b70d-19b2-7e6d-a2c7-493c4155c309",
  type: "page-type/world-character",
  slug: "tessa-sharpclaw",
  title: "Tessa Sharpclaw",
  world: "world/the-wandering-inn",
  firstChapter: 812,
  lastChapter: 812,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
