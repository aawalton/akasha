import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const hiveno = {
  id: "01a0b70a-fe82-7214-ae2e-35aa218735ae",
  type: "page-type/world-character",
  slug: "hiveno",
  title: "Hiveno",
  world: "world/the-wandering-inn",
  firstChapter: 784,
  lastChapter: 784,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
