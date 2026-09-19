import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ithaca = {
  id: "01a0b70b-15ae-7e5e-a5cb-946f5233ee7b",
  type: "page-type/world-character",
  slug: "ithaca",
  title: "Ithaca",
  world: "world/the-wandering-inn",
  firstChapter: 643,
  lastChapter: 643,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
