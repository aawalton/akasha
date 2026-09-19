import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const esor = {
  id: "01a0b70a-7444-7d55-a839-768d039b2f5e",
  type: "page-type/world-character",
  slug: "esor",
  title: "Esor",
  world: "world/the-wandering-inn",
  firstChapter: 719,
  lastChapter: 794,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
