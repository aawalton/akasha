import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const kirne = {
  id: "01a0b70b-6cf1-7d70-8d89-5990abf236d6",
  type: "page-type/world-character",
  slug: "kirne",
  title: "Kirne",
  world: "world/the-wandering-inn",
  firstChapter: 565,
  lastChapter: 565,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
