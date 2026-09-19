import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const possive = {
  id: "01a0b70c-7266-7d3c-ad90-f90532d80a6b",
  type: "page-type/world-character",
  slug: "possive",
  title: "Lady Possive",
  world: "world/the-wandering-inn",
  firstChapter: 705,
  lastChapter: 705,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
