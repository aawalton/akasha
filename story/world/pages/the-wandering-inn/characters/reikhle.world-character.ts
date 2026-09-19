import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const reikhle = {
  id: "01a0b70c-8ca0-7f9d-bd72-9f6f45c8b19c",
  type: "page-type/world-character",
  slug: "reikhle",
  title: "Reikhle",
  world: "world/the-wandering-inn",
  firstChapter: 383,
  lastChapter: 383,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
