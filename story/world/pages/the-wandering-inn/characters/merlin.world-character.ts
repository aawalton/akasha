import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const merlin = {
  id: "01a0b70b-e9db-79fe-9d5f-cc813c15d985",
  type: "page-type/world-character",
  slug: "merlin",
  title: "Merlin",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 480,
  lastChapter: 480,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:23:26.427Z",
  updatedAt: "2026-09-22T13:09:40.000Z",
} as const satisfies WorldCharacter
