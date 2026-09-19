import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const prophet = {
  id: "01a0b70c-7655-7298-bdee-8e9c4f5ef03b",
  type: "page-type/world-character",
  slug: "prophet",
  title: "Prophet",
  world: "world/the-wandering-inn",
  firstChapter: 67,
  lastChapter: 67,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
