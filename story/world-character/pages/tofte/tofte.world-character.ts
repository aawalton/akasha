import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tofte = {
  id: "01a0b70d-691e-7387-8f1d-3f1fbedd3e1c",
  type: "page-type/world-character",
  slug: "tofte",
  title: "Tofte",
  world: "world/the-wandering-inn",
  firstChapter: 316,
  lastChapter: 316,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
