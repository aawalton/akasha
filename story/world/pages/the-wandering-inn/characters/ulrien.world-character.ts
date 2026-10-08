import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ulrien = {
  id: "01a0b70d-7e5c-774c-839f-eace9e1ea13f",
  type: "page-type/world-character",
  slug: "ulrien",
  title: "Ulrien",
  world: "world/the-wandering-inn",
  appearanceCount: 9,
  firstChapter: 94,
  lastChapter: 213,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:25:09.980Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
