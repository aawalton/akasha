import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lagister = {
  id: "01a0b70b-770d-7eb3-a305-6d2206c7d0ad",
  type: "page-type/world-character",
  slug: "lagister",
  title: "Lagister",
  world: "world/the-wandering-inn",
  firstChapter: 794,
  lastChapter: 794,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
