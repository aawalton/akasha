import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const studentRags = {
  id: "01a0b70d-0ff9-7715-a7dc-005c389677c7",
  type: "page-type/world-character",
  slug: "student-rags",
  title: "Student Rags",
  world: "world/the-wandering-inn",
  firstChapter: 747,
  lastChapter: 764,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
