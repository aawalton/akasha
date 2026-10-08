import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const tamaroth = {
  id: "01a0b70d-1337-7e8d-8543-24927d85cdba",
  type: "page-type/world-character",
  slug: "tamaroth",
  title: "Tamaroth",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  firstChapter: 176,
  lastChapter: 758,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:42.551Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
