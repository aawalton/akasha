import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lacel = {
  id: "01a0b70b-7170-754a-8cc7-8dfa83e87010",
  type: "page-type/world-character",
  slug: "lacel",
  title: "Lacel the Leaper",
  world: "world/the-wandering-inn",
  firstChapter: 413,
  lastChapter: 413,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
