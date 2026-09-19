import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const maximillian = {
  id: "01a0b70b-e374-72ea-bf41-9ac8daf4a07c",
  type: "page-type/world-character",
  slug: "maximillian",
  title: "Maximillian",
  world: "world/the-wandering-inn",
  firstChapter: 735,
  lastChapter: 735,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
