import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const theMaestro = {
  id: "01a0b70d-1efb-7ef7-82d6-12307248ac18",
  type: "page-type/world-character",
  slug: "the-maestro",
  title: "the Maestro",
  world: "world/the-wandering-inn",
  firstChapter: 629,
  lastChapter: 630,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
