import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const eldavinUntethered = {
  id: "01a0b72b-3863-7d46-9550-51cf8545fade",
  type: "page-type/world-character",
  slug: "eldavin-untethered",
  title: "Eldavin",
  world: "world/the-wandering-inn",
  firstChapter: 587,
  lastChapter: 804,
} as const satisfies WorldCharacter
