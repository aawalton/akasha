import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const huntressDelezza = {
  id: "01a0b70b-0351-7294-a1dc-a0e1d264b984",
  type: "page-type/world-character",
  slug: "huntress-delezza",
  title: "Delezza",
  world: "world/the-wandering-inn",
  firstChapter: 437,
  lastChapter: 437,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
