import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const facestealer = {
  id: "01a0b70a-78b1-791e-9d40-ac8ab46ba66c",
  type: "page-type/world-character",
  slug: "facestealer",
  title: "Facestealer",
  world: "world/the-wandering-inn",
  firstChapter: 364,
  lastChapter: 364,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
