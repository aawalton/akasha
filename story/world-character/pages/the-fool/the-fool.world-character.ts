import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const theFool = {
  id: "01a0b70d-1d1e-74f5-b4ae-990ba7fc0a0f",
  type: "page-type/world-character",
  slug: "the-fool",
  title: "Fool",
  world: "world/the-wandering-inn",
  firstChapter: 216,
  lastChapter: 217,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
