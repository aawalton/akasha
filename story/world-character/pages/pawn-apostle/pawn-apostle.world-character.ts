import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const pawnApostle = {
  id: "01a0b70c-22f1-7ef3-a3b2-0b2db3e9ee50",
  type: "page-type/world-character",
  slug: "pawn-apostle",
  title: "Pawn",
  world: "world/the-wandering-inn",
  firstChapter: 753,
  lastChapter: 757,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
