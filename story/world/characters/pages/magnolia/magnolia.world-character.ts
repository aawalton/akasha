import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const magnolia = {
  id: "01a0b70b-963e-7ad5-bc16-b525daed6a80",
  type: "page-type/world-character",
  slug: "magnolia",
  title: "Magnolia",
  world: "world/the-wandering-inn",
  firstChapter: 47,
  lastChapter: 749,
  characterClaims: "jsonl",
  aliasOf: "world-character/magnolia-reinhart",
} as const satisfies WorldCharacter
