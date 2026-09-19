import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theOldbloodDrake = {
  id: "01a0b70d-1fe6-7857-a201-175aea0fe763",
  type: "page-type/world-character",
  slug: "the-oldblood-drake",
  title: "the Infiltrator",
  world: "world/the-wandering-inn",
  firstChapter: 362,
  lastChapter: 362,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
