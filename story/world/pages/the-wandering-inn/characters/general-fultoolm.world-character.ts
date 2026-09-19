import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const generalFultoolm = {
  id: "01a0b70a-9550-7afb-bafb-c7a84eb64b61",
  type: "page-type/world-character",
  slug: "general-fultoolm",
  title: "General Fultoolm",
  world: "world/the-wandering-inn",
  firstChapter: 410,
  lastChapter: 410,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
