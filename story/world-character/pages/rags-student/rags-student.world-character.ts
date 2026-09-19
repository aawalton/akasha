import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ragsStudent = {
  id: "01a0b70c-85b5-706e-ba75-87e4bf3219b1",
  type: "page-type/world-character",
  slug: "rags-student",
  title: "Rags",
  world: "world/the-wandering-inn",
  firstChapter: 741,
  lastChapter: 745,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
