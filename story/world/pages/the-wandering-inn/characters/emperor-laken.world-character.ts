import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const emperorLaken = {
  id: "01a0b70a-6c70-789b-90ca-14547e2f6302",
  type: "page-type/world-character",
  slug: "emperor-laken",
  title: "Laken",
  world: "world/the-wandering-inn",
  firstChapter: 264,
  lastChapter: 264,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
