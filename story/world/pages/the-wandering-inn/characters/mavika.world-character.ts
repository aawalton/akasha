import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mavika = {
  id: "01a0b70b-df12-70ed-9b00-371e95b0d51e",
  type: "page-type/world-character",
  slug: "mavika",
  title: "Mavika",
  world: "world/the-wandering-inn",
  appearanceCount: 10,
  firstChapter: 350,
  lastChapter: 611,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:23:23.666Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
