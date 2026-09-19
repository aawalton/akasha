import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const grandDesignIsthekenous = {
  id: "01a0b70a-e8cc-7940-8a8d-1fc1ee109cb3",
  type: "page-type/world-character",
  slug: "grand-design-isthekenous",
  title: "Grand Design of Isthekenous",
  world: "world/the-wandering-inn",
  firstChapter: 762,
  lastChapter: 762,
  characterClaims: "jsonl",
  aliasOf: "world-character/grand-design",
} as const satisfies WorldCharacter
