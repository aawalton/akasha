import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lyfelt = {
  id: "01a0b70b-90e7-7d8d-a4e7-68c5ce3d22c3",
  type: "page-type/world-character",
  slug: "lyfelt",
  title: "Lyfelt",
  world: "world/the-wandering-inn",
  firstChapter: 326,
  lastChapter: 492,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
