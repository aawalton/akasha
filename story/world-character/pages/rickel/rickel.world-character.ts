import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rickel = {
  id: "01a0b70c-9767-79da-bef7-479af8de728e",
  type: "page-type/world-character",
  slug: "rickel",
  title: "Rickel",
  world: "world/the-wandering-inn",
  firstChapter: 538,
  lastChapter: 625,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
