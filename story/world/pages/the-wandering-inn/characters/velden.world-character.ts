import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const velden = {
  id: "01a0b70d-8ad6-773a-9dc8-6d2ec0fb74e7",
  type: "page-type/world-character",
  slug: "velden",
  title: "Velden",
  world: "world/the-wandering-inn",
  firstChapter: 562,
  lastChapter: 562,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
