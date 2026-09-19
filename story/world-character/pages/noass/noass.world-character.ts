import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const noass = {
  id: "01a0b70c-0a46-7b40-a2ec-f57e8dda4fe5",
  type: "page-type/world-character",
  slug: "noass",
  title: "Noass",
  world: "world/the-wandering-inn",
  firstChapter: 391,
  lastChapter: 410,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
