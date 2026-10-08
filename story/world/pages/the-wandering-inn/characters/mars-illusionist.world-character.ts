import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const marsIllusionist = {
  id: "01a0b70b-9cf6-7535-8664-5557d58d8bce",
  type: "page-type/world-character",
  slug: "mars-illusionist",
  title: "Mars",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  firstChapter: 323,
  lastChapter: 704,
  characterClaims: "jsonl",
  aliasOf: "world-character/mars",
  createdAt: "2026-09-19T00:23:06.742Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
