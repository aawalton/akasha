import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const coretine = {
  id: "01a0b70a-07f8-742c-9b1b-46296782960e",
  type: "page-type/world-character",
  slug: "coretine",
  title: "Coretine the First",
  world: "world/the-wandering-inn",
  firstChapter: 593,
  lastChapter: 593,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
