import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const periss = {
  id: "01a0b70c-28c2-78dd-b620-fbb0a082aa3a",
  type: "page-type/world-character",
  slug: "periss",
  title: "Periss",
  world: "world/the-wandering-inn",
  firstChapter: 102,
  lastChapter: 489,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
