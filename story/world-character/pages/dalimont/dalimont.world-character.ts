import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const dalimont = {
  id: "01a0b70a-0e86-7f47-8a78-4d0cf0154e3e",
  type: "page-type/world-character",
  slug: "dalimont",
  title: "Ser Dalimont",
  world: "world/the-wandering-inn",
  firstChapter: 540,
  lastChapter: 740,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
