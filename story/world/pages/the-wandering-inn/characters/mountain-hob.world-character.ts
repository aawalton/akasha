import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mountainHob = {
  id: "01a0b70b-f7dc-7135-aef9-4db1b2eb46ef",
  type: "page-type/world-character",
  slug: "mountain-hob",
  title: "the Hob from Tremborag's mountain",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 155,
  lastChapter: 155,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:23:30.012Z",
  updatedAt: "2026-09-22T13:09:40.000Z",
} as const satisfies WorldCharacter
