import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sacraOdveig = {
  id: "01a0b70c-a6e0-7e43-aad6-eb61d1075131",
  type: "page-type/world-character",
  slug: "sacra-odveig",
  title: "Sacra",
  world: "world/the-wandering-inn",
  firstChapter: 250,
  lastChapter: 250,
  characterClaims: "jsonl",
  aliasOf: "world-character/sacra",
} as const satisfies WorldCharacter
