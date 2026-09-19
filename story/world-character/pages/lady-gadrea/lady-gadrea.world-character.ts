import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ladyGadrea = {
  id: "01a0b70b-7366-7ede-98d4-a91bfece75d5",
  type: "page-type/world-character",
  slug: "lady-gadrea",
  title: "Lady Gadrea",
  world: "world/the-wandering-inn",
  firstChapter: 545,
  lastChapter: 545,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
