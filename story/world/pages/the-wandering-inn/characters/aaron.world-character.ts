import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const aaron = {
  id: "01a0b707-5f1e-74b5-84e9-63e9fae67be9",
  type: "page-type/world-character",
  slug: "aaron",
  title: "Aaron Vanwell",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  firstChapter: 431,
  lastChapter: 771,
  characterClaims: "jsonl",
  aliasOf: "world-character/aaron-vanwell",
  createdAt: "2026-09-19T00:18:28.766Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
