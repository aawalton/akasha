import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const xrnTheSmallQueen = {
  id: "01a0b70d-d904-74f6-af28-661574f6be76",
  type: "page-type/world-character",
  slug: "xrn-the-small-queen",
  title: "Xrn",
  world: "world/the-wandering-inn",
  firstChapter: 153,
  lastChapter: 153,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
