import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const beycalt = {
  id: "01a0b707-8404-7f77-b8d9-18a37683362c",
  type: "page-type/world-character",
  slug: "beycalt",
  title: "Beycalt Newman",
  world: "world/the-wandering-inn",
  firstChapter: 346,
  lastChapter: 346,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
