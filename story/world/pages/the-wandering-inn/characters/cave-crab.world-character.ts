import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const caveCrab = {
  id: "01a0b705-e6fb-74f4-b562-2d8b0b4a3dd1",
  type: "page-type/world-character",
  slug: "cave-crab",
  title: "large crustacean monster",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 2,
  lastChapter: 2,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:16:52.475Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
