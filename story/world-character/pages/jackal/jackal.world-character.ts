import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const jackal = {
  id: "01a0b70b-17a5-7204-ad9e-8fa9d1feb2d4",
  type: "page-type/world-character",
  slug: "jackal",
  title: "Jackal",
  world: "world/the-wandering-inn",
  firstChapter: 273,
  lastChapter: 273,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
