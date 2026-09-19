import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sainath = {
  id: "01a0b70c-a83b-7665-a18a-86525542551d",
  type: "page-type/world-character",
  slug: "sainath",
  title: "Sainath",
  world: "world/the-wandering-inn",
  firstChapter: 399,
  lastChapter: 399,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
