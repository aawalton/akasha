import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const hayvon = {
  id: "01a0b70a-f3b1-7af9-9ab1-6bdca71e3ee1",
  type: "page-type/world-character",
  slug: "hayvon",
  title: "Hayvon",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 625,
  lastChapter: 625,
  characterClaims: "jsonl",
  aliasOf: "world-character/hayvon-operland",
  createdAt: "2026-09-19T00:22:23.409Z",
  updatedAt: "2026-09-22T13:09:26.000Z",
} as const satisfies WorldCharacter
