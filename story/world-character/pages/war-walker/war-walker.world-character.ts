import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const warWalker = {
  id: "01a0b70d-994c-719b-ba99-46e95f62c686",
  type: "page-type/world-character",
  slug: "war-walker",
  title: "the War Walker",
  world: "world/the-wandering-inn",
  firstChapter: 198,
  lastChapter: 198,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
