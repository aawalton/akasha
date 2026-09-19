import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mysteriousBoardContact = {
  id: "01a0b70b-fb8d-76b5-a74b-8925e6a1cbd5",
  type: "page-type/world-character",
  slug: "mysterious-board-contact",
  title: "Unknown Acquaintance",
  world: "world/the-wandering-inn",
  firstChapter: 394,
  lastChapter: 394,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
