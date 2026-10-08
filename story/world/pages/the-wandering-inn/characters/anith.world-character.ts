import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const anith = {
  id: "01a0b707-6eb2-7255-9b71-f7cd6aef631b",
  type: "page-type/world-character",
  slug: "anith",
  title: "Anith",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  firstChapter: 185,
  lastChapter: 255,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:18:32.754Z",
  updatedAt: "2026-09-22T13:09:11.000Z",
} as const satisfies WorldCharacter
