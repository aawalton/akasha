import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const velan = {
  id: "01a0b70d-8a64-7d16-8d1d-5544ad2e2048",
  type: "page-type/world-character",
  slug: "velan",
  title: "the Goblin King",
  world: "world/the-wandering-inn",
  firstChapter: 157,
  lastChapter: 729,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
