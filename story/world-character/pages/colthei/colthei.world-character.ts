import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const colthei = {
  id: "01a0b70a-05e8-7631-8296-73051de31a22",
  type: "page-type/world-character",
  slug: "colthei",
  title: "Colthei (Colth)",
  world: "world/the-wandering-inn",
  firstChapter: 797,
  lastChapter: 798,
  characterClaims: "jsonl",
  aliasOf: "world-character/colth",
} as const satisfies WorldCharacter
