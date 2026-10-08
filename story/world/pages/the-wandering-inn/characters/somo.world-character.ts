import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const somo = {
  id: "01a0b70d-0960-7a49-88bc-5e2c466fe96d",
  type: "page-type/world-character",
  slug: "somo",
  title: "Somo",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 723,
  lastChapter: 729,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:40.032Z",
  updatedAt: "2026-09-22T13:09:47.000Z",
} as const satisfies WorldCharacter
