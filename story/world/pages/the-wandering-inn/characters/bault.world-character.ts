import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bault = {
  id: "01a0b707-7c81-7517-96eb-fb85a758cf28",
  type: "page-type/world-character",
  slug: "bault",
  title: "Bault",
  world: "world/the-wandering-inn",
  firstChapter: 316,
  lastChapter: 316,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
