import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const twinGirl = {
  id: "01a0b70d-76bf-7b49-932a-42de07b03e5b",
  type: "page-type/world-character",
  slug: "twin-girl",
  title: "a girl of sixteen",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 27,
  lastChapter: 27,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:25:08.031Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
