import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rikku = {
  id: "01a0b70c-9926-7d8c-8e8f-000eba398146",
  type: "page-type/world-character",
  slug: "rikku",
  title: "Rikku",
  world: "world/the-wandering-inn",
  firstChapter: 85,
  lastChapter: 85,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
