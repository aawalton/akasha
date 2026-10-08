import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const octavia = {
  id: "01a0b70c-1419-7cfd-83ef-c218c7056666",
  type: "page-type/world-character",
  slug: "octavia",
  title: "Octavia",
  world: "world/the-wandering-inn",
  appearanceCount: 34,
  firstChapter: 77,
  lastChapter: 793,
  characterClaims: "jsonl",
  aliasOf: "world-character/octavia-cotton",
  createdAt: "2026-09-19T00:23:37.241Z",
  updatedAt: "2026-09-22T13:09:40.000Z",
} as const satisfies WorldCharacter
