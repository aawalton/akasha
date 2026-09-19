import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const kingOfDestruction = {
  id: "01a0b70b-6c1b-7a7c-8b56-37d37b6a12ce",
  type: "page-type/world-character",
  slug: "king-of-destruction",
  title: "Flos",
  world: "world/the-wandering-inn",
  firstChapter: 207,
  lastChapter: 207,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
