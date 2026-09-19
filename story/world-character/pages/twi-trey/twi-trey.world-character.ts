import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const twiTrey = {
  id: "01a0b70d-7647-79a6-9789-d18e77ab76e2",
  type: "page-type/world-character",
  slug: "twi-trey",
  title: "Trey",
  world: "world/the-wandering-inn",
  firstChapter: 180,
  lastChapter: 180,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
