import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const shellc = {
  id: "01a0b70c-fc65-758a-8727-1b755c0a12a9",
  type: "page-type/world-character",
  slug: "shellc",
  title: "Major Shellc",
  world: "world/the-wandering-inn",
  firstChapter: 822,
  lastChapter: 822,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
