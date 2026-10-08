import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sikeriWyrm = {
  id: "01a0b70d-0016-7141-bb5d-d22324f96127",
  type: "page-type/world-character",
  slug: "sikeri-wyrm",
  title: "the Wyrm",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 475,
  lastChapter: 551,
  characterClaims: "jsonl",
  aliasOf: "world-character/sikeri",
  createdAt: "2026-09-19T00:24:37.654Z",
  updatedAt: "2026-09-22T13:09:47.000Z",
} as const satisfies WorldCharacter
