import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theQuarass = {
  id: "01a0b70d-20d5-7202-a1a9-1674f0270a1e",
  type: "page-type/world-character",
  slug: "the-quarass",
  title: "The Quarass",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 426,
  lastChapter: 821,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:46.037Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
