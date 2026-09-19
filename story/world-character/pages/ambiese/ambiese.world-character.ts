import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ambiese = {
  id: "01a0b707-6b6c-753c-bcd0-c8ef5225603b",
  type: "page-type/world-character",
  slug: "ambiese",
  title: "Ambiese",
  world: "world/the-wandering-inn",
  firstChapter: 784,
  lastChapter: 785,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
