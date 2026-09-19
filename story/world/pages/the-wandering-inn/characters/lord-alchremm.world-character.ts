import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lordAlchremm = {
  id: "01a0b70b-88b5-71ea-8d8e-8e5453cb185d",
  type: "page-type/world-character",
  slug: "lord-alchremm",
  title: "Lord Alchremm",
  world: "world/the-wandering-inn",
  firstChapter: 487,
  lastChapter: 487,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
