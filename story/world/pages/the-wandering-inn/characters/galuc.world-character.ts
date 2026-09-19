import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const galuc = {
  id: "01a0b70a-8ff4-7008-a6fd-303977b8f96b",
  type: "page-type/world-character",
  slug: "galuc",
  title: "the Builder",
  world: "world/the-wandering-inn",
  firstChapter: 132,
  lastChapter: 442,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
