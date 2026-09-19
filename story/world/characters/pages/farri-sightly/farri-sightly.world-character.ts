import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const farriSightly = {
  id: "01a0b70a-7bee-7740-8bec-44ecae8ae2f6",
  type: "page-type/world-character",
  slug: "farri-sightly",
  title: "Farri Sightly",
  world: "world/the-wandering-inn",
  firstChapter: 328,
  lastChapter: 328,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
