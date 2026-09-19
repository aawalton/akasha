import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theSecondMind = {
  id: "01a0b70d-2187-71b6-9d91-de03defb2f42",
  type: "page-type/world-character",
  slug: "the-second-mind",
  title: "the Second Mind",
  world: "world/the-wandering-inn",
  firstChapter: 546,
  lastChapter: 546,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
