import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const thomast = {
  id: "01a0b70d-62ce-713f-a427-e323b998976f",
  type: "page-type/world-character",
  slug: "thomast",
  title: "Thomast",
  world: "world/the-wandering-inn",
  firstChapter: 183,
  lastChapter: 654,
  characterClaims: "jsonl",
  aliasOf: "world-character/thomast-veniral",
} as const satisfies WorldCharacter
