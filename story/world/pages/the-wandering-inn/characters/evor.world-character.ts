import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const evor = {
  id: "01a0b70a-7604-7906-b15a-19d0620bb506",
  type: "page-type/world-character",
  slug: "evor",
  title: "Evor",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 815,
  lastChapter: 815,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:21:51.236Z",
  updatedAt: "2026-09-22T13:09:18.000Z",
} as const satisfies WorldCharacter
