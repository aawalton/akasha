import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const receptionistRemendia = {
  id: "01a0b70c-8888-7f78-84d5-21bded1bf91b",
  type: "page-type/world-character",
  slug: "receptionist-remendia",
  title: "Guild Receptionist",
  world: "world/the-wandering-inn",
  firstChapter: 22,
  lastChapter: 22,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
