import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ladyDealiaZolde = {
  id: "01a0b70b-732f-7118-9b67-0088c72d3d71",
  type: "page-type/world-character",
  slug: "lady-dealia-zolde",
  title: "Lady Dealia Zolde",
  world: "world/the-wandering-inn",
  firstChapter: 416,
  lastChapter: 416,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
