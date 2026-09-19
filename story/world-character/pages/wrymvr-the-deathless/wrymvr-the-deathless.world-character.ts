import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const wrymvrTheDeathless = {
  id: "01a0b70d-a185-7cc9-b398-bc25b5d1fbdc",
  type: "page-type/world-character",
  slug: "wrymvr-the-deathless",
  title: "Wrymvr",
  world: "world/the-wandering-inn",
  firstChapter: 113,
  lastChapter: 113,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
