import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const krsyslWordsmith = {
  id: "01a0b70b-6f75-74b3-9f8f-f65be7dd0dd0",
  type: "page-type/world-character",
  slug: "krsysl-wordsmith",
  title: "Krsysl Wordsmith",
  world: "world/the-wandering-inn",
  firstChapter: 112,
  lastChapter: 235,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
