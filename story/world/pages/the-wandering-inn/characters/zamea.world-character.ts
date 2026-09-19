import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const zamea = {
  id: "01a0b70d-e814-72d4-96c1-671ba9554ef7",
  type: "page-type/world-character",
  slug: "zamea",
  title: "Zamea",
  world: "world/the-wandering-inn",
  firstChapter: 398,
  lastChapter: 705,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
