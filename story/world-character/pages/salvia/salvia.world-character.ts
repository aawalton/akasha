import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const salvia = {
  id: "01a0b70c-abe8-767a-9e3a-b915afc3e532",
  type: "page-type/world-character",
  slug: "salvia",
  title: "Salvia",
  world: "world/the-wandering-inn",
  firstChapter: 233,
  lastChapter: 688,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
