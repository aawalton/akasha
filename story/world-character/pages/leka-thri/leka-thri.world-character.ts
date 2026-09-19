import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lekaThri = {
  id: "01a0b70b-8053-743c-81fa-8287890ccf9e",
  type: "page-type/world-character",
  slug: "leka-thri",
  title: "the warrior",
  world: "world/the-wandering-inn",
  firstChapter: 541,
  lastChapter: 541,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
