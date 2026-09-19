import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lellia = {
  id: "01a0b70b-808a-7844-885e-0e1c5476574f",
  type: "page-type/world-character",
  slug: "lellia",
  title: "Lellia",
  world: "world/the-wandering-inn",
  firstChapter: 328,
  lastChapter: 328,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
