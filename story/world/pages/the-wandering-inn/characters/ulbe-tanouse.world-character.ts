import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ulbeTanouse = {
  id: "01a0b70d-7b66-7e4a-95a4-5609de367812",
  type: "page-type/world-character",
  slug: "ulbe-tanouse",
  title: "Ulbe Tanouse",
  world: "world/the-wandering-inn",
  firstChapter: 824,
  lastChapter: 824,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
