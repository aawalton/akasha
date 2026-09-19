import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const kingEvein = {
  id: "01a0b70b-6b7c-7bda-9dd0-fc9e12c728a0",
  type: "page-type/world-character",
  slug: "king-evein",
  title: "Evein",
  world: "world/the-wandering-inn",
  firstChapter: 712,
  lastChapter: 712,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
