import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theMaestro = {
  id: "01a0b70d-1efb-7ef7-82d6-12307248ac18",
  type: "page-type/world-character",
  slug: "the-maestro",
  title: "the Maestro",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  firstChapter: 629,
  lastChapter: 630,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:24:45.563Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
