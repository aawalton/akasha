import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const mrell = {
  id: "01a0b70b-f885-7ab2-a7bb-2982a0a7279a",
  type: "page-type/world-character",
  slug: "mrell",
  title: "Mrell",
  world: "world/the-wandering-inn",
  firstChapter: 543,
  lastChapter: 565,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
