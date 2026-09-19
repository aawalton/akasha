import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const goldbody = {
  id: "01a0b70a-e5a6-78a1-86ae-330267304f71",
  type: "page-type/world-character",
  slug: "goldbody",
  title: "Goldbody",
  world: "world/the-wandering-inn",
  firstChapter: 728,
  lastChapter: 763,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
