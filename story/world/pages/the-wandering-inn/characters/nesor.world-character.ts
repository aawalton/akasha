import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nesor = {
  id: "01a0b70c-0880-78d1-a53c-abe081d333f9",
  type: "page-type/world-character",
  slug: "nesor",
  title: "Nesor",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  firstChapter: 221,
  lastChapter: 350,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:23:34.272Z",
  updatedAt: "2026-09-22T13:09:40.000Z",
} as const satisfies WorldCharacter
