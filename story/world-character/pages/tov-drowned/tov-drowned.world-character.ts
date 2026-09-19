import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tovDrowned = {
  id: "01a0b70d-6f88-7c17-9a1b-4bfd91794d35",
  type: "page-type/world-character",
  slug: "tov-drowned",
  title: "Tov",
  world: "world/the-wandering-inn",
  firstChapter: 496,
  lastChapter: 496,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
