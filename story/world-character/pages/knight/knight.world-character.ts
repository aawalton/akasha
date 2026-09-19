import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const knight = {
  id: "01a0b70b-6e32-779f-9696-11fcff0ed7d8",
  type: "page-type/world-character",
  slug: "knight",
  title: "Knight",
  world: "world/the-wandering-inn",
  firstChapter: 63,
  lastChapter: 64,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
