import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const patricia = {
  id: "01a0b70c-20be-7721-9b6c-cf7a7ff27377",
  type: "page-type/world-character",
  slug: "patricia",
  title: "Patricia",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 183,
  lastChapter: 183,
  characterClaims: "jsonl",
  aliasOf: "world-character/patricia-melissar",
  createdAt: "2026-09-19T00:23:40.478Z",
  updatedAt: "2026-09-22T13:09:40.000Z",
} as const satisfies WorldCharacter
