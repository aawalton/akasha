import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const kingFetohep = {
  id: "01a0b70b-6bb1-7a3e-8726-5d6aa9cdccba",
  type: "page-type/world-character",
  slug: "king-fetohep",
  title: "King Fetohep",
  world: "world/the-wandering-inn",
  firstChapter: 369,
  lastChapter: 652,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
