import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theCrimsonSoldier = {
  id: "01a0b70d-1c2d-7adf-98eb-8aa71470e298",
  type: "page-type/world-character",
  slug: "the-crimson-soldier",
  title: "The Crimson Soldier",
  world: "world/the-wandering-inn",
  firstChapter: 547,
  lastChapter: 547,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
