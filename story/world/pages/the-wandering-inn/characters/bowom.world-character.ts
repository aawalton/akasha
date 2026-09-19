import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const bowom = {
  id: "01a0b707-88ba-72ed-9fbe-6e756add199b",
  type: "page-type/world-character",
  slug: "bowom",
  title: "Bowom",
  world: "world/the-wandering-inn",
  firstChapter: 736,
  lastChapter: 805,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
