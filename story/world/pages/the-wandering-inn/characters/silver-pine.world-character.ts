import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const silverPine = {
  id: "01a0b70d-00f4-757d-a66d-862beaec435e",
  type: "page-type/world-character",
  slug: "silver-pine",
  title: "Silver Pine",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 475,
  lastChapter: 475,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:37.876Z",
  updatedAt: "2026-09-22T13:09:47.000Z",
} as const satisfies WorldCharacter
