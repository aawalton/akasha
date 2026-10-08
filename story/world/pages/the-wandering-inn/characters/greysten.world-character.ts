import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const greysten = {
  id: "01a0b70a-eb1d-7dd4-96f1-6856f44934b1",
  type: "page-type/world-character",
  slug: "greysten",
  title: "Greysten",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  firstChapter: 507,
  lastChapter: 608,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:21.213Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
