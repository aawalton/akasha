import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const threeKings = {
  id: "01a0b70d-6397-73fb-9027-6f99d4c44f19",
  type: "page-type/world-character",
  slug: "three-kings",
  title: "Three Kings",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 533,
  lastChapter: 533,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:25:03.127Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
