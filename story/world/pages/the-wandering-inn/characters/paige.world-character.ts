import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const paige = {
  id: "01a0b70c-2012-77e2-96be-cef7ca4ab35a",
  type: "page-type/world-character",
  slug: "paige",
  title: "Paige",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  firstChapter: 315,
  lastChapter: 695,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:23:40.306Z",
  updatedAt: "2026-09-22T13:09:40.000Z",
} as const satisfies WorldCharacter
