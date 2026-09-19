import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const antinium = {
  id: "01a0b707-6f1d-7c32-b07b-4e46d620a6c5",
  type: "page-type/world-character",
  slug: "antinium",
  title: "the Antinium",
  world: "world/the-wandering-inn",
  firstChapter: 110,
  lastChapter: 110,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
