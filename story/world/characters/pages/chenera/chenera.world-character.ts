import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const chenera = {
  id: "01a0b709-fdbe-726e-9c73-ea09dd1e0f2d",
  type: "page-type/world-character",
  slug: "chenera",
  title: "Chenera",
  world: "world/the-wandering-inn",
  firstChapter: 487,
  lastChapter: 487,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
