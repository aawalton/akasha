import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lizze = {
  id: "01a0b70b-880f-74bb-9b7f-0facb7a2b2c8",
  type: "page-type/world-character",
  slug: "lizze",
  title: "Lizze",
  world: "world/the-wandering-inn",
  firstChapter: 817,
  lastChapter: 817,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
