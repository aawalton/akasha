import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const tersk = {
  id: "01a0b70d-193d-7d35-845c-fb9a683d562f",
  type: "page-type/world-character",
  slug: "tersk",
  title: "Tersk",
  world: "world/the-wandering-inn",
  firstChapter: 190,
  lastChapter: 392,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
