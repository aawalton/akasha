import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const venith = {
  id: "01a0b70d-8e11-795f-baa9-fdd700cc4160",
  type: "page-type/world-character",
  slug: "venith",
  title: "Venith",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 178,
  lastChapter: 182,
  characterClaims: "jsonl",
  aliasOf: "world-character/venith-crusland",
  createdAt: "2026-09-19T00:25:14.001Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
