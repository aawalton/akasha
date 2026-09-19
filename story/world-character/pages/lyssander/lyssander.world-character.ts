import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lyssander = {
  id: "01a0b70b-94ed-7457-bc01-de31409cc97b",
  type: "page-type/world-character",
  slug: "lyssander",
  title: "Lyssander",
  world: "world/the-wandering-inn",
  firstChapter: 794,
  lastChapter: 794,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
