import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const bearclaw = {
  id: "01a0b707-7d40-7b51-8923-fa839786de14",
  type: "page-type/world-character",
  slug: "bearclaw",
  title: "Bearclaw",
  world: "world/the-wandering-inn",
  firstChapter: 379,
  lastChapter: 429,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
