import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const vhiren = {
  id: "01a0b70d-9312-7913-9e43-e578a1179006",
  type: "page-type/world-character",
  slug: "vhiren",
  title: "Vhiren",
  world: "world/the-wandering-inn",
  firstChapter: 783,
  lastChapter: 783,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
