import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const agratha = {
  id: "01a0b707-657c-7a6f-8a30-9cd6368903ea",
  type: "page-type/world-character",
  slug: "agratha",
  title: "Agratha",
  world: "world/the-wandering-inn",
  firstChapter: 611,
  lastChapter: 611,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
