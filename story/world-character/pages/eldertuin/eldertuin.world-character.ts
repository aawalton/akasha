import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const eldertuin = {
  id: "01a0b70a-26ab-7254-89ef-87e5efac46e3",
  type: "page-type/world-character",
  slug: "eldertuin",
  title: "Eldertuin",
  world: "world/the-wandering-inn",
  firstChapter: 620,
  lastChapter: 620,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
