import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const barelleBard = {
  id: "01a0b707-7a01-7501-a312-3115f90ad680",
  type: "page-type/world-character",
  slug: "barelle-bard",
  title: "Barelle",
  world: "world/the-wandering-inn",
  firstChapter: 534,
  lastChapter: 534,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
