import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const buler = {
  id: "01a0b707-8b00-7d2b-a2f1-90e16a4a8fc8",
  type: "page-type/world-character",
  slug: "buler",
  title: "Buler",
  world: "world/the-wandering-inn",
  firstChapter: 670,
  lastChapter: 671,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
