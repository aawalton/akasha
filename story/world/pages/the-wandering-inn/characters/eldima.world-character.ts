import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const eldima = {
  id: "01a0b70a-26e6-7861-87ef-cc9259ea1b78",
  type: "page-type/world-character",
  slug: "eldima",
  title: "Eldima",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  firstChapter: 315,
  lastChapter: 331,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:21:30.982Z",
  updatedAt: "2026-09-22T13:09:18.000Z",
} as const satisfies WorldCharacter
