import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const virreg = {
  id: "01a0b70d-94b5-764a-b86c-18a1fa3a8201",
  type: "page-type/world-character",
  slug: "virreg",
  title: "Virreg",
  world: "world/the-wandering-inn",
  firstChapter: 470,
  lastChapter: 470,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
