import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const firstGardener = {
  id: "01a0b70a-88e8-7d46-bd72-b07c1c4ba9ac",
  type: "page-type/world-character",
  slug: "first-gardener",
  title: "Shaerrha Brasswing",
  world: "world/the-wandering-inn",
  firstChapter: 491,
  lastChapter: 491,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
