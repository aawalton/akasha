import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const chaita = {
  id: "01a0b709-fc83-7b08-b888-dc093f3dc8ee",
  type: "page-type/world-character",
  slug: "chaita",
  title: "Chaita",
  world: "world/the-wandering-inn",
  firstChapter: 325,
  lastChapter: 325,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
