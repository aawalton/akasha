import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const maukset = {
  id: "01a0b70b-a0ad-77c1-9b3a-e793523bfccf",
  type: "page-type/world-character",
  slug: "maukset",
  title: "Maukset",
  world: "world/the-wandering-inn",
  firstChapter: 720,
  lastChapter: 720,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
