import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const chieftainRags = {
  id: "01a0b709-feda-704e-968f-1b0a741332f4",
  type: "page-type/world-character",
  slug: "chieftain-rags",
  title: "Chieftain Rags",
  world: "world/the-wandering-inn",
  firstChapter: 747,
  lastChapter: 763,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
