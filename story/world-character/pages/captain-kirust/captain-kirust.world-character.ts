import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const captainKirust = {
  id: "01a0b707-935d-739b-acd4-15784d9c5cfc",
  type: "page-type/world-character",
  slug: "captain-kirust",
  title: "Captain Kirust",
  world: "world/the-wandering-inn",
  firstChapter: 216,
  lastChapter: 216,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
