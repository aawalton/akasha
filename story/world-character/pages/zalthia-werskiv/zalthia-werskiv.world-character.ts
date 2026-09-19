import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const zalthiaWerskiv = {
  id: "01a0b70d-e7d8-7c52-8b9f-c242c86a7dc6",
  type: "page-type/world-character",
  slug: "zalthia-werskiv",
  title: "Zalthia",
  world: "world/the-wandering-inn",
  firstChapter: 198,
  lastChapter: 198,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
