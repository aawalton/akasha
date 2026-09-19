import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const dameTruvia = {
  id: "01a0b70a-106e-75d4-b995-b0e927dc86d4",
  type: "page-type/world-character",
  slug: "dame-truvia",
  title: "Truvia",
  world: "world/the-wandering-inn",
  firstChapter: 349,
  lastChapter: 349,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
