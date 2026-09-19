import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const merchantYerham = {
  id: "01a0b70b-e7d1-7731-b6bf-aa46de3e6598",
  type: "page-type/world-character",
  slug: "merchant-yerham",
  title: "Merchant Yerham",
  world: "world/the-wandering-inn",
  firstChapter: 779,
  lastChapter: 779,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
