import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const elkrin = {
  id: "01a0b70a-65b0-7899-9dfe-c2475c2b8c01",
  type: "page-type/world-character",
  slug: "elkrin",
  title: "Elkrin",
  world: "world/the-wandering-inn",
  firstChapter: 160,
  lastChapter: 160,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
