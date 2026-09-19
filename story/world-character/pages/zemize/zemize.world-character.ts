import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const zemize = {
  id: "01a0b70d-eb51-7346-a0e8-9fcd8572c9e3",
  type: "page-type/world-character",
  slug: "zemize",
  title: "Zemize",
  world: "world/the-wandering-inn",
  firstChapter: 644,
  lastChapter: 789,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
