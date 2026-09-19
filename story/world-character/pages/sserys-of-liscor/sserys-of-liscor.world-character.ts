import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const sserysOfLiscor = {
  id: "01a0b70d-0e3f-7c6b-ad6b-ff00b2467751",
  type: "page-type/world-character",
  slug: "sserys-of-liscor",
  title: "Sserys",
  world: "world/the-wandering-inn",
  firstChapter: 113,
  lastChapter: 113,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
