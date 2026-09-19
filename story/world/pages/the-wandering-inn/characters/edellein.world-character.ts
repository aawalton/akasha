import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const edellein = {
  id: "01a0b70a-2318-7d2c-9475-d49aff2cc361",
  type: "page-type/world-character",
  slug: "edellein",
  title: "Edellein",
  world: "world/the-wandering-inn",
  firstChapter: 719,
  lastChapter: 794,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
