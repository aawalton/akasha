import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const jelov = {
  id: "01a0b70b-1e55-7b45-b939-a020034f79d8",
  type: "page-type/world-character",
  slug: "jelov",
  title: "Jelov",
  world: "world/the-wandering-inn",
  firstChapter: 203,
  lastChapter: 221,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
