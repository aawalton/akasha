import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const wrymvr = {
  id: "01a0b70d-a112-71d0-83d9-1dc359b0f892",
  type: "page-type/world-character",
  slug: "wrymvr",
  title: "Wrymvr",
  world: "world/the-wandering-inn",
  firstChapter: 175,
  lastChapter: 811,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
