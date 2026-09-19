import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const sserys = {
  id: "01a0b70d-0e07-7351-903a-6fb92da8a5ad",
  type: "page-type/world-character",
  slug: "sserys",
  title: "Sserys",
  world: "world/the-wandering-inn",
  firstChapter: 175,
  lastChapter: 757,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
