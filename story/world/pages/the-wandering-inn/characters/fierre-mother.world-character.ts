import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const fierreMother = {
  id: "01a0b70a-8637-7cdd-bb00-97faedaa9ae5",
  type: "page-type/world-character",
  slug: "fierre-mother",
  title: "Fierre's mother",
  world: "world/the-wandering-inn",
  firstChapter: 311,
  lastChapter: 311,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
