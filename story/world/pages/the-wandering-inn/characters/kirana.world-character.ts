import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const kirana = {
  id: "01a0b70b-6cbb-7a22-acbf-998f4a01f2ef",
  type: "page-type/world-character",
  slug: "kirana",
  title: "Kirana",
  world: "world/the-wandering-inn",
  firstChapter: 316,
  lastChapter: 695,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
