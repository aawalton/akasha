import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const theGrandDesign = {
  id: "01a0b70d-1e0c-7280-96cf-6ec5a2020c7c",
  type: "page-type/world-character",
  slug: "the-grand-design",
  title: "The Grand Design",
  world: "world/the-wandering-inn",
  firstChapter: 719,
  lastChapter: 719,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
