import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const merdon = {
  id: "01a0b70b-e846-7bc5-8d5a-4c76b2e36500",
  type: "page-type/world-character",
  slug: "merdon",
  title: "Merdon",
  world: "world/the-wandering-inn",
  firstChapter: 605,
  lastChapter: 605,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
