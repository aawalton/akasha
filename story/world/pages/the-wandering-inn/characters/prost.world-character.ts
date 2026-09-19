import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const prost = {
  id: "01a0b70c-768b-78b5-91bd-36401c51b5c3",
  type: "page-type/world-character",
  slug: "prost",
  title: "Prost",
  world: "world/the-wandering-inn",
  firstChapter: 137,
  lastChapter: 359,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
