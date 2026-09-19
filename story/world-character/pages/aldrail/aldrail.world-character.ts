import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const aldrail = {
  id: "01a0b707-6845-7f2a-9e01-a6d7f2cf48a8",
  type: "page-type/world-character",
  slug: "aldrail",
  title: "Aldrail",
  world: "world/the-wandering-inn",
  firstChapter: 685,
  lastChapter: 685,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
