import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const delezza = {
  id: "01a0b70a-15ef-7687-b5c9-5fcfc5b0a7bd",
  type: "page-type/world-character",
  slug: "delezza",
  title: "Huntress Delezza",
  world: "world/the-wandering-inn",
  firstChapter: 438,
  lastChapter: 438,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
