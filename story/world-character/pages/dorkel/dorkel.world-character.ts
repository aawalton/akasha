import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const dorkel = {
  id: "01a0b70a-1bb8-7bc0-aadd-ae98234da64e",
  type: "page-type/world-character",
  slug: "dorkel",
  title: "Dorkel",
  world: "world/the-wandering-inn",
  firstChapter: 707,
  lastChapter: 707,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
