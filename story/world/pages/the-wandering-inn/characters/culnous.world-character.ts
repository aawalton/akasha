import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const culnous = {
  id: "01a0b70a-0c76-77bc-a253-ec374e55a727",
  type: "page-type/world-character",
  slug: "culnous",
  title: "Culnous",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 596,
  lastChapter: 596,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
