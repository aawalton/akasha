import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const uxel = {
  id: "01a0b70d-8337-7a65-a685-b5e9841e25ee",
  type: "page-type/world-character",
  slug: "uxel",
  title: "Commander Uxel",
  world: "world/the-wandering-inn",
  firstChapter: 438,
  lastChapter: 439,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
