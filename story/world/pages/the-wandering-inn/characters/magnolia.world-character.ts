import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const magnolia = {
  id: "01a0b70b-963e-7ad5-bc16-b525daed6a80",
  type: "page-type/world-character",
  slug: "magnolia",
  title: "Magnolia",
  world: "world/the-wandering-inn",
  appearanceCount: 11,
  firstChapter: 47,
  lastChapter: 749,
  characterClaims: "jsonl",
  aliasOf: "world-character/magnolia-reinhart",
  createdAt: "2026-09-19T00:23:05.022Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
