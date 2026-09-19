import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const qshom = {
  id: "01a0b70c-7844-7ea0-bd6b-1e2a8cfc3aa9",
  type: "page-type/world-character",
  slug: "qshom",
  title: "Qshom",
  world: "world/the-wandering-inn",
  firstChapter: 529,
  lastChapter: 552,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
