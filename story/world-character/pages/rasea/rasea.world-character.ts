import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rasea = {
  id: "01a0b70c-8698-7d46-b6a3-bd0acd2a2326",
  type: "page-type/world-character",
  slug: "rasea",
  title: "Rasea Zecrew",
  world: "world/the-wandering-inn",
  firstChapter: 634,
  lastChapter: 634,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
