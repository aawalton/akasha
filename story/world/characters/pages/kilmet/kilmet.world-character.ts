import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const kilmet = {
  id: "01a0b70b-6a8f-7c6d-ab72-6d06d980e17e",
  type: "page-type/world-character",
  slug: "kilmet",
  title: "Kilmet",
  world: "world/the-wandering-inn",
  firstChapter: 291,
  lastChapter: 291,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
