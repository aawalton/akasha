import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const demastel = {
  id: "01a0b70a-1690-7a7a-8984-7aae1b4ae5aa",
  type: "page-type/world-character",
  slug: "demastel",
  title: "Demastel",
  world: "world/the-wandering-inn",
  firstChapter: 544,
  lastChapter: 544,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
