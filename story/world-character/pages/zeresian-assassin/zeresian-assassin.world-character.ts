import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const zeresianAssassin = {
  id: "01a0b70d-ec41-7bee-bf58-e1586db9ee44",
  type: "page-type/world-character",
  slug: "zeresian-assassin",
  title: "Unknown Drake",
  world: "world/the-wandering-inn",
  firstChapter: 508,
  lastChapter: 508,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
