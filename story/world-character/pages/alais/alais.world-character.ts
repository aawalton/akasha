import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const alais = {
  id: "01a0b707-66e8-7810-ae20-1ced11f382a4",
  type: "page-type/world-character",
  slug: "alais",
  title: "Alais",
  world: "world/the-wandering-inn",
  firstChapter: 329,
  lastChapter: 330,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
