import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const beatrice = {
  id: "01a0b707-7e99-749c-bbc6-5bf0d82c6e66",
  type: "page-type/world-character",
  slug: "beatrice",
  title: "Beatrice",
  world: "world/the-wandering-inn",
  appearanceCount: 7,
  firstChapter: 158,
  lastChapter: 275,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:36.825Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
