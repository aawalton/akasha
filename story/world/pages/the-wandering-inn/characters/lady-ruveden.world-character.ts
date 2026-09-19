import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ladyRuveden = {
  id: "01a0b70b-755a-7845-a687-3de089d22129",
  type: "page-type/world-character",
  slug: "lady-ruveden",
  title: "Ruveden",
  world: "world/the-wandering-inn",
  firstChapter: 591,
  lastChapter: 691,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
