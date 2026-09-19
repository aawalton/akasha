import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const eldavinUntethered = {
  id: "01a0b72b-3863-7d46-9550-51cf8545fade",
  type: "page-type/world-character",
  slug: "eldavin-untethered",
  title: "Eldavin",
  world: "world/the-wandering-inn",
  maxLevel: 16,
  eventCount: 4,
  firstChapter: 587,
  lastChapter: 804,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
