import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const diomedes = {
  id: "01a0b70a-193e-75c1-91ca-5ede9e0a250d",
  type: "page-type/world-character",
  slug: "diomedes",
  title: "Diomedes",
  world: "world/the-wandering-inn",
  firstChapter: 696,
  lastChapter: 696,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
