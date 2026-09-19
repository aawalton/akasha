import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const omniscel = {
  id: "01a0b70c-183d-7b9b-a3ff-9d274e9d30e8",
  type: "page-type/world-character",
  slug: "omniscel",
  title: "Omniscel",
  world: "world/the-wandering-inn",
  firstChapter: 552,
  lastChapter: 552,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
