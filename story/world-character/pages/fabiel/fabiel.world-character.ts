import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const fabiel = {
  id: "01a0b70a-7847-7eed-8ed2-833719e1d7e6",
  type: "page-type/world-character",
  slug: "fabiel",
  title: "Fabiel",
  world: "world/the-wandering-inn",
  firstChapter: 203,
  lastChapter: 203,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
