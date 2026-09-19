import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const highKingPerric = {
  id: "01a0b70a-fbc7-7485-8b55-4a9f16f27370",
  type: "page-type/world-character",
  slug: "high-king-perric",
  title: "High King Perric",
  world: "world/the-wandering-inn",
  firstChapter: 453,
  lastChapter: 694,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
