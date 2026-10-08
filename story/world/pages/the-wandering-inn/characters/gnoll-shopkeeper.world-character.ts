import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gnollShopkeeper = {
  id: "01a0b70a-a0a2-7bfa-bdde-351604181bb9",
  type: "page-type/world-character",
  slug: "gnoll-shopkeeper",
  title: "tall Gnoll shopkeeper",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 19,
  lastChapter: 19,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:02.146Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
