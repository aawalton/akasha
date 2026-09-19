import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const pricky = {
  id: "01a0b70c-730d-7231-9184-c2a7d5bab8b6",
  type: "page-type/world-character",
  slug: "pricky",
  title: "Pricky",
  world: "world/the-wandering-inn",
  firstChapter: 453,
  lastChapter: 453,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
