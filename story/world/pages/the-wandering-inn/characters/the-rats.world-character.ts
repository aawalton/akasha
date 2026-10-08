import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theRats = {
  id: "01a0b70d-214d-7ce8-8b63-a5c248ece429",
  type: "page-type/world-character",
  slug: "the-rats",
  title: "two rats",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 356,
  lastChapter: 356,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:46.157Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
