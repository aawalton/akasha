import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const emily = {
  id: "01a0b70a-6b70-7ef8-9459-19a671223b7e",
  type: "page-type/world-character",
  slug: "emily",
  title: "Emily",
  world: "world/the-wandering-inn",
  firstChapter: 97,
  lastChapter: 438,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
