import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const venithCrusland = {
  id: "01a0b70d-8e4b-7ca4-a517-4e90b09ae84d",
  type: "page-type/world-character",
  slug: "venith-crusland",
  title: "Venith Crusland",
  world: "world/the-wandering-inn",
  firstChapter: 179,
  lastChapter: 559,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
