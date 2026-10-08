import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const halracTheGrim = {
  id: "01a0b70a-f08b-72f5-9ae6-8b356adf7e6a",
  type: "page-type/world-character",
  slug: "halrac-the-grim",
  title: "Halrac",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 248,
  lastChapter: 506,
  characterClaims: "jsonl",
  aliasOf: "world-character/halrac-everam",
  createdAt: "2026-09-19T00:22:22.603Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
