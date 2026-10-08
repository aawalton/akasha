import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const troyAtlas = {
  id: "01a0b70d-731c-78bc-b012-447e5da2201d",
  type: "page-type/world-character",
  slug: "troy-atlas",
  title: "Troy Atlas",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 545,
  lastChapter: 556,
  characterClaims: "jsonl",
  aliasOf: "world-character/trey-atwood",
  createdAt: "2026-09-19T00:25:07.100Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
