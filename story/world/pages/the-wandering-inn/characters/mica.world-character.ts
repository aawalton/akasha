import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mica = {
  id: "01a0b70b-ea86-733d-8d7f-9f747a9d76b0",
  type: "page-type/world-character",
  slug: "mica",
  title: "Mica",
  world: "world/the-wandering-inn",
  firstChapter: 328,
  lastChapter: 328,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
