import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const greysten = {
  id: "01a0b70a-eb1d-7dd4-96f1-6856f44934b1",
  type: "page-type/world-character",
  slug: "greysten",
  title: "Greysten",
  world: "world/the-wandering-inn",
  firstChapter: 507,
  lastChapter: 608,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
