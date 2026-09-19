import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const freeQueen = {
  id: "01a0b70a-8ca9-7c67-9e7c-978b9f702440",
  type: "page-type/world-character",
  slug: "free-queen",
  title: "Free Queen of the Antinium",
  world: "world/the-wandering-inn",
  firstChapter: 274,
  lastChapter: 442,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
