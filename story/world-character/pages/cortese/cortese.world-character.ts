import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const cortese = {
  id: "01a0b70a-0894-711b-9d84-8ebac1fd1ac7",
  type: "page-type/world-character",
  slug: "cortese",
  title: "Cortese",
  world: "world/the-wandering-inn",
  firstChapter: 634,
  lastChapter: 731,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
