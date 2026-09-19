import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const woll = {
  id: "01a0b70d-a031-7f37-bfeb-ae207d2f5f70",
  type: "page-type/world-character",
  slug: "woll",
  title: "Woll",
  world: "world/the-wandering-inn",
  firstChapter: 816,
  lastChapter: 816,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
