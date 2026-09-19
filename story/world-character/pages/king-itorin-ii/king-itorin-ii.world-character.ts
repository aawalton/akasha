import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const kingItorinIi = {
  id: "01a0b70b-6be7-741b-8d09-863a5b192b23",
  type: "page-type/world-character",
  slug: "king-itorin-ii",
  title: "King Itorin II",
  world: "world/the-wandering-inn",
  firstChapter: 596,
  lastChapter: 596,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
