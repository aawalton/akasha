import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const luan = {
  id: "01a0b70b-8d99-76e6-8535-67b1ab7148bb",
  type: "page-type/world-character",
  slug: "luan",
  title: "Luan",
  world: "world/the-wandering-inn",
  appearanceCount: 10,
  firstChapter: 196,
  lastChapter: 695,
  characterClaims: "jsonl",
  aliasOf: "world-character/luan-khumalo",
  createdAt: "2026-09-19T00:23:02.809Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
