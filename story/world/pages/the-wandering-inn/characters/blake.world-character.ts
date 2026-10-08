import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const blake = {
  id: "01a0b707-8705-7269-845f-788b47edf750",
  type: "page-type/world-character",
  slug: "blake",
  title: "Blake",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 316,
  lastChapter: 695,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:38.981Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
