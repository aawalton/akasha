import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nailihuaileArchmage = {
  id: "01a0b70b-fc41-7e7b-9f08-8f0ccb05bae1",
  type: "page-type/world-character",
  slug: "nailihuaile-archmage",
  title: "Archmage Nailihuaile",
  world: "world/the-wandering-inn",
  firstChapter: 431,
  lastChapter: 431,
  characterClaims: "jsonl",
  aliasOf: "world-character/nailihuaile",
} as const satisfies WorldCharacter
