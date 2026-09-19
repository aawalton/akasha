import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ladyBethalWalchais = {
  id: "01a0b70b-71e1-7710-9398-b93c2f43c626",
  type: "page-type/world-character",
  slug: "lady-bethal-walchais",
  title: "Lady Bethal Walchaís",
  world: "world/the-wandering-inn",
  firstChapter: 252,
  lastChapter: 349,
  characterClaims: "jsonl",
  aliasOf: "world-character/bethal-walchais",
} as const satisfies WorldCharacter
