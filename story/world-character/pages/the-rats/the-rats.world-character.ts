import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const theRats = {
  id: "01a0b70d-214d-7ce8-8b63-a5c248ece429",
  type: "page-type/world-character",
  slug: "the-rats",
  title: "two rats",
  world: "world/the-wandering-inn",
  firstChapter: 356,
  lastChapter: 356,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
