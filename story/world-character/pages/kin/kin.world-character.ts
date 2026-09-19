import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const kin = {
  id: "01a0b70b-6ac6-7a09-aa3b-6b673a01bfa2",
  type: "page-type/world-character",
  slug: "kin",
  title: "Kin",
  world: "world/the-wandering-inn",
  firstChapter: 391,
  lastChapter: 391,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
