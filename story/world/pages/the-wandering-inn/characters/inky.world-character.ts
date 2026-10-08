import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const inky = {
  id: "01a0b70b-0d0f-72b8-aeee-31b81c8927e2",
  type: "page-type/world-character",
  slug: "inky",
  title: "Inky",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 417,
  lastChapter: 417,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:29.903Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
