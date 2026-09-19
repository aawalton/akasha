import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const thker = {
  id: "01a0b70d-26c0-7ca9-b6e5-bca9f42188a0",
  type: "page-type/world-character",
  slug: "thker",
  title: "Thker",
  world: "world/the-wandering-inn",
  firstChapter: 815,
  lastChapter: 815,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
