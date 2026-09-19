import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const menrise = {
  id: "01a0b70b-e70f-7959-8851-43dac3da6287",
  type: "page-type/world-character",
  slug: "menrise",
  title: "Menrise",
  world: "world/the-wandering-inn",
  firstChapter: 685,
  lastChapter: 795,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
