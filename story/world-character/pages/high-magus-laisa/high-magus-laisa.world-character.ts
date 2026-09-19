import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const highMagusLaisa = {
  id: "01a0b70a-fcf2-77e1-880b-9a0bdc476656",
  type: "page-type/world-character",
  slug: "high-magus-laisa",
  title: "High Magus Laisa",
  world: "world/the-wandering-inn",
  firstChapter: 387,
  lastChapter: 387,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
