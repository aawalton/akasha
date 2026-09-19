import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const daiton = {
  id: "01a0b70a-0e18-7ba4-90d2-27ead9fb10b6",
  type: "page-type/world-character",
  slug: "daiton",
  title: "Daiton",
  world: "world/the-wandering-inn",
  firstChapter: 324,
  lastChapter: 325,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
