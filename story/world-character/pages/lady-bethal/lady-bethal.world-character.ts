import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ladyBethal = {
  id: "01a0b70b-71a9-7faa-93c2-533ad2786aad",
  type: "page-type/world-character",
  slug: "lady-bethal",
  title: "Lady Bethal Walchaís",
  world: "world/the-wandering-inn",
  firstChapter: 225,
  lastChapter: 251,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
