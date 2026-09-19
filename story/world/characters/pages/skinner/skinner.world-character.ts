import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const skinner = {
  id: "01a0b70d-04e4-7d43-b9fb-88c12c6cb4c7",
  type: "page-type/world-character",
  slug: "skinner",
  title: "the creature",
  world: "world/the-wandering-inn",
  firstChapter: 63,
  lastChapter: 329,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
