import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const colovt = {
  id: "01a0b70a-0549-7988-9e23-9a9391663657",
  type: "page-type/world-character",
  slug: "colovt",
  title: "Farmer Colovt",
  world: "world/the-wandering-inn",
  firstChapter: 624,
  lastChapter: 808,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
