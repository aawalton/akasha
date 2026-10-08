import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const crimsonSoldier = {
  id: "01a0b70a-09ba-7c41-8e04-1a15bd123576",
  type: "page-type/world-character",
  slug: "crimson-soldier",
  title: "the Crimson Soldier",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 560,
  lastChapter: 560,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:21:23.514Z",
  updatedAt: "2026-09-22T13:09:18.000Z",
} as const satisfies WorldCharacter
