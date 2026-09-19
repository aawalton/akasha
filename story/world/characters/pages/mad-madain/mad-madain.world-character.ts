import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const madMadain = {
  id: "01a0b70b-9526-7929-a62d-76f91e24acfc",
  type: "page-type/world-character",
  slug: "mad-madain",
  title: "Madain",
  world: "world/the-wandering-inn",
  firstChapter: 311,
  lastChapter: 311,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
