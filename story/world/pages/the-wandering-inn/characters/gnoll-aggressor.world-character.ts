import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gnollAggressor = {
  id: "01a0b70a-9ff9-75ae-9a65-f17d72bd8bda",
  type: "page-type/world-character",
  slug: "gnoll-aggressor",
  title: "the Gnoll in the Adventurer's Guild",
  world: "world/the-wandering-inn",
  firstChapter: 13,
  lastChapter: 13,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
