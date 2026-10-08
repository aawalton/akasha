import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const blackmage = {
  id: "01a0b707-86cf-7c4e-8241-9ac403838aba",
  type: "page-type/world-character",
  slug: "blackmage",
  title: "BlackMage",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 111,
  lastChapter: 173,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:38.927Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
