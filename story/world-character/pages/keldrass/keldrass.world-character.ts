import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const keldrass = {
  id: "01a0b70b-619c-72c0-8f61-950a34ce525f",
  type: "page-type/world-character",
  slug: "keldrass",
  title: "Keldrass",
  world: "world/the-wandering-inn",
  firstChapter: 289,
  lastChapter: 364,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
