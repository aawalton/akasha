import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const silverPine = {
  id: "01a0b70d-00f4-757d-a66d-862beaec435e",
  type: "page-type/world-character",
  slug: "silver-pine",
  title: "Silver Pine",
  world: "world/the-wandering-inn",
  firstChapter: 475,
  lastChapter: 475,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
