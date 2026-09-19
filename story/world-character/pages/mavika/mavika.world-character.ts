import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const mavika = {
  id: "01a0b70b-df12-70ed-9b00-371e95b0d51e",
  type: "page-type/world-character",
  slug: "mavika",
  title: "Mavika",
  world: "world/the-wandering-inn",
  firstChapter: 350,
  lastChapter: 611,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
