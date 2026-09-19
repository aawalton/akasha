import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const gilaw = {
  id: "01a0b70a-9dc3-7eec-82da-efafb1b1cc9e",
  type: "page-type/world-character",
  slug: "gilaw",
  title: "Gilaw",
  world: "world/the-wandering-inn",
  firstChapter: 533,
  lastChapter: 596,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
