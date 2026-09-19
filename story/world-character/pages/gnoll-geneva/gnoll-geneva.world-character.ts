import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const gnollGeneva = {
  id: "01a0b70a-a06a-74f7-810f-b2096e7a732e",
  type: "page-type/world-character",
  slug: "gnoll-geneva",
  title: "unnamed Gnoll",
  world: "world/the-wandering-inn",
  firstChapter: 643,
  lastChapter: 643,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
