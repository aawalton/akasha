import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theHalfling = {
  id: "01a0b70d-1e84-79be-be7a-c5c6986a19cd",
  type: "page-type/world-character",
  slug: "the-halfling",
  title: "the man on the moon",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 739,
  lastChapter: 739,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:45.444Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
