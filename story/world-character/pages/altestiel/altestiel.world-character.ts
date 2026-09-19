import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const altestiel = {
  id: "01a0b707-6acc-7997-981b-9d35922cddea",
  type: "page-type/world-character",
  slug: "altestiel",
  title: "Altestiel",
  world: "world/the-wandering-inn",
  firstChapter: 471,
  lastChapter: 685,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
