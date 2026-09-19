import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lingyang = {
  id: "01a0b70b-8529-7224-b5bf-453380c75a92",
  type: "page-type/world-character",
  slug: "lingyang",
  title: "伶央",
  world: "world/the-wandering-inn",
  firstChapter: 67,
  lastChapter: 67,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
