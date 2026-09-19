import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lapsey = {
  id: "01a0b70b-7aed-7b7a-8292-b6990201bc86",
  type: "page-type/world-character",
  slug: "lapsey",
  title: "Lapsey",
  world: "world/the-wandering-inn",
  firstChapter: 713,
  lastChapter: 714,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
