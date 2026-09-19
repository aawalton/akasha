import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mortemdefieirTitan = {
  id: "01a0b70b-f7a5-78d9-b976-9c47d474e4c3",
  type: "page-type/world-character",
  slug: "mortemdefieir-titan",
  title: "Mortemdefieir Titan",
  world: "world/the-wandering-inn",
  firstChapter: 741,
  lastChapter: 741,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
