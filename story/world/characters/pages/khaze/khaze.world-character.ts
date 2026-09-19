import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const khaze = {
  id: "01a0b70b-6917-7c15-921f-b1c79c0ebb39",
  type: "page-type/world-character",
  slug: "khaze",
  title: "Khaze",
  world: "world/the-wandering-inn",
  firstChapter: 520,
  lastChapter: 520,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
