import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const alchemistIrurx = {
  id: "01a0b707-67ab-75b4-9b1d-2bc249234e17",
  type: "page-type/world-character",
  slug: "alchemist-irurx",
  title: "Alchemist Irurx",
  world: "world/the-wandering-inn",
  firstChapter: 552,
  lastChapter: 553,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
