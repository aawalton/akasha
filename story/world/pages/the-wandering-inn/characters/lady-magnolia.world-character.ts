import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ladyMagnolia = {
  id: "01a0b70b-740d-7af8-80d7-1cf9834c0d60",
  type: "page-type/world-character",
  slug: "lady-magnolia",
  title: "Lady Magnolia Reinhart",
  world: "world/the-wandering-inn",
  firstChapter: 43,
  lastChapter: 205,
  characterClaims: "jsonl",
  aliasOf: "world-character/magnolia-reinhart",
} as const satisfies WorldCharacter
