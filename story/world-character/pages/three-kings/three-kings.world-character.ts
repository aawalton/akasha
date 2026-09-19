import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const threeKings = {
  id: "01a0b70d-6397-73fb-9027-6f99d4c44f19",
  type: "page-type/world-character",
  slug: "three-kings",
  title: "Three Kings",
  world: "world/the-wandering-inn",
  firstChapter: 533,
  lastChapter: 533,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
