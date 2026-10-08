import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ulva = {
  id: "01a0b70d-7ed0-717c-8c43-b744f2ad1486",
  type: "page-type/world-character",
  slug: "ulva",
  title: "Ulva Terland",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 821,
  lastChapter: 821,
  characterClaims: "jsonl",
  aliasOf: "world-character/ulva-terland",
  createdAt: "2026-09-19T00:25:10.096Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
