import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const elirr = {
  id: "01a0b70a-6543-7ecc-8425-670951471941",
  type: "page-type/world-character",
  slug: "elirr",
  title: "Elirr",
  world: "world/the-wandering-inn",
  firstChapter: 284,
  lastChapter: 659,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
