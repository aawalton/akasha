import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const anith = {
  id: "01a0b707-6eb2-7255-9b71-f7cd6aef631b",
  type: "page-type/world-character",
  slug: "anith",
  title: "Anith",
  world: "world/the-wandering-inn",
  firstChapter: 185,
  lastChapter: 255,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
