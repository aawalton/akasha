import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const astival = {
  id: "01a0b707-7598-7506-8d1e-8836ca4d1fca",
  type: "page-type/world-character",
  slug: "astival",
  title: "Astival",
  world: "world/the-wandering-inn",
  firstChapter: 711,
  lastChapter: 770,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
