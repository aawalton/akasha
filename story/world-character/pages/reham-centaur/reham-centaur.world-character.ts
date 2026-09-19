import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rehamCentaur = {
  id: "01a0b70c-8c2b-735d-87a6-bfde2c2fa476",
  type: "page-type/world-character",
  slug: "reham-centaur",
  title: "Reham",
  world: "world/the-wandering-inn",
  firstChapter: 496,
  lastChapter: 496,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
