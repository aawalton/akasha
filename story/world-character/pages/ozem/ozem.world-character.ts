import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ozem = {
  id: "01a0b70c-1f9f-7c9e-a6bf-6576db93b1c2",
  type: "page-type/world-character",
  slug: "ozem",
  title: "Ozem",
  world: "world/the-wandering-inn",
  firstChapter: 454,
  lastChapter: 454,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
