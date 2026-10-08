import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ladyMagnolia = {
  id: "01a0b70b-740d-7af8-80d7-1cf9834c0d60",
  type: "page-type/world-character",
  slug: "lady-magnolia",
  title: "Lady Magnolia Reinhart",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  firstChapter: 43,
  lastChapter: 205,
  characterClaims: "jsonl",
  aliasOf: "world-character/magnolia-reinhart",
  createdAt: "2026-09-19T00:22:56.269Z",
  updatedAt: "2026-09-22T13:09:33.000Z",
} as const satisfies WorldCharacter
