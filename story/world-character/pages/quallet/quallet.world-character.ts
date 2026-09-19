import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const quallet = {
  id: "01a0b70c-787b-70a0-8c12-e4b21336d8f1",
  type: "page-type/world-character",
  slug: "quallet",
  title: "Quallet Marshhand",
  world: "world/the-wandering-inn",
  firstChapter: 199,
  lastChapter: 575,
  characterClaims: "jsonl",
  aliasOf: "world-character/quallet-marshhand",
} as const satisfies WorldCharacter
