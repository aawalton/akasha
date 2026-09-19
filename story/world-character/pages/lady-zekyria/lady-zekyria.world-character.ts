import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ladyZekyria = {
  id: "01a0b70b-76a1-7c2c-98db-6e5bf8a34b5f",
  type: "page-type/world-character",
  slug: "lady-zekyria",
  title: "Zekyria",
  world: "world/the-wandering-inn",
  firstChapter: 215,
  lastChapter: 217,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
