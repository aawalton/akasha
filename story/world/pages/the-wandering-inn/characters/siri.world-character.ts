import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const siri = {
  id: "01a0b70d-035d-77ff-82ff-3b8ed1c07e16",
  type: "page-type/world-character",
  slug: "siri",
  title: "Siri",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  firstChapter: 316,
  lastChapter: 695,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:38.493Z",
  updatedAt: "2026-09-22T13:09:47.000Z",
} as const satisfies WorldCharacter
