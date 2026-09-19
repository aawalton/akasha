import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const emessa = {
  id: "01a0b70a-6b3c-7c42-a2b3-67b911bf11c4",
  type: "page-type/world-character",
  slug: "emessa",
  title: "Emessa",
  world: "world/the-wandering-inn",
  firstChapter: 389,
  lastChapter: 788,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
