import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theGrandDesign = {
  id: "01a0b70d-1e0c-7280-96cf-6ec5a2020c7c",
  type: "page-type/world-character",
  slug: "the-grand-design",
  title: "The Grand Design",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 719,
  lastChapter: 719,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:45.324Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
