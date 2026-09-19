import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const sithorn = {
  id: "01a0b70d-0394-7141-8a07-6d5e15bb98c8",
  type: "page-type/world-character",
  slug: "sithorn",
  title: "Sithorn",
  world: "world/the-wandering-inn",
  firstChapter: 449,
  lastChapter: 449,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
