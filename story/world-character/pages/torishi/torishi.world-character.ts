import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const torishi = {
  id: "01a0b70d-6de6-79fb-9eea-de76ae676531",
  type: "page-type/world-character",
  slug: "torishi",
  title: "Torishi Weatherfur",
  world: "world/the-wandering-inn",
  firstChapter: 543,
  lastChapter: 584,
  characterClaims: "jsonl",
  aliasOf: "world-character/torishi-weatherfur",
} as const satisfies WorldCharacter
