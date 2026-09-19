import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const bethalWalchai = {
  id: "01a0b707-82cd-73a4-a548-e7cc92e08bb0",
  type: "page-type/world-character",
  slug: "bethal-walchai",
  title: "Lady Bethal Walchai",
  world: "world/the-wandering-inn",
  firstChapter: 264,
  lastChapter: 264,
  characterClaims: "jsonl",
  aliasOf: "world-character/bethal-walchais",
} as const satisfies WorldCharacter
