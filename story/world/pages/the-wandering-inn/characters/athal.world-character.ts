import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const athal = {
  id: "01a0b707-75ce-7c81-8fe9-d83ec345126a",
  type: "page-type/world-character",
  slug: "athal",
  title: "Athal",
  world: "world/the-wandering-inn",
  firstChapter: 399,
  lastChapter: 399,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
