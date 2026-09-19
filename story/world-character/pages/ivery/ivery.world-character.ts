import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ivery = {
  id: "01a0b70b-16c2-715e-8c06-3122eced0dfa",
  type: "page-type/world-character",
  slug: "ivery",
  title: "Ivery",
  world: "world/the-wandering-inn",
  firstChapter: 552,
  lastChapter: 552,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
