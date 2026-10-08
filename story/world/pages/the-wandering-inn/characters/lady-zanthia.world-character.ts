import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ladyZanthia = {
  id: "01a0b70b-766a-76f4-bc92-a6d3d3ccaa44",
  type: "page-type/world-character",
  slug: "lady-zanthia",
  title: "Zanthia",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 338,
  lastChapter: 416,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:22:56.874Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
