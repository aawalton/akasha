import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const therriumSailwinds = {
  id: "01a0b70d-2569-78db-a2a8-5bdb069932cb",
  type: "page-type/world-character",
  slug: "therrium-sailwinds",
  title: "Captain Therrium",
  world: "world/the-wandering-inn",
  firstChapter: 418,
  lastChapter: 786,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
