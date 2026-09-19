import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const abel = {
  id: "01a0b707-5fac-79ef-9265-f78434e5d651",
  type: "page-type/world-character",
  slug: "abel",
  title: "Abel",
  world: "world/the-wandering-inn",
  firstChapter: 495,
  lastChapter: 495,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
