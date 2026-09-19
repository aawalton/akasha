import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lupp = {
  id: "01a0b70b-903c-7a56-a903-ec9f6dab1995",
  type: "page-type/world-character",
  slug: "lupp",
  title: "Farmer Lupp",
  world: "world/the-wandering-inn",
  firstChapter: 469,
  lastChapter: 469,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
