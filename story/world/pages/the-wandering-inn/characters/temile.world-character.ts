import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const temile = {
  id: "01a0b70d-152a-700c-bacc-e95a3736cd02",
  type: "page-type/world-character",
  slug: "temile",
  title: "Temile",
  world: "world/the-wandering-inn",
  firstChapter: 458,
  lastChapter: 458,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
