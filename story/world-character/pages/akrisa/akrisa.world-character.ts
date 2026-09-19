import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const akrisa = {
  id: "01a0b707-668c-7ae6-9043-d3049e0d2c2b",
  type: "page-type/world-character",
  slug: "akrisa",
  title: "Akrisa Silverfang",
  world: "world/the-wandering-inn",
  firstChapter: 485,
  lastChapter: 564,
  characterClaims: "jsonl",
  aliasOf: "world-character/akrisa-silverfang",
} as const satisfies WorldCharacter
