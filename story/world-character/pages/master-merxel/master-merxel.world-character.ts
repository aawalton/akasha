import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const masterMerxel = {
  id: "01a0b70b-9e13-7d8c-9b15-49963bbf754b",
  type: "page-type/world-character",
  slug: "master-merxel",
  title: "Master Merxel",
  world: "world/the-wandering-inn",
  firstChapter: 504,
  lastChapter: 504,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
