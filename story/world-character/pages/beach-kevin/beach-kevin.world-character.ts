import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const beachKevin = {
  id: "01a0b759-feb6-7ee1-bc9a-b2f159165e92",
  type: "page-type/world-character",
  slug: "beach-kevin",
  title: "Beach Kevin",
  world: "world/the-wandering-inn",
  firstChapter: 750,
  lastChapter: 753,
  characterClaims: "jsonl",
  mergedInto: "world-character/kevin",
} as const satisfies WorldCharacter
