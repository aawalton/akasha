import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const chesacre = {
  id: "01a0b709-fdee-7923-a4e5-7aeebd81a093",
  type: "page-type/world-character",
  slug: "chesacre",
  title: "Chesacre",
  world: "world/the-wandering-inn",
  firstChapter: 411,
  lastChapter: 414,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
