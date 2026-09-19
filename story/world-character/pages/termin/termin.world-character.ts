import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const termin = {
  id: "01a0b70d-18cc-774e-9845-9325898a8cfd",
  type: "page-type/world-character",
  slug: "termin",
  title: "Termin",
  world: "world/the-wandering-inn",
  firstChapter: 156,
  lastChapter: 665,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
