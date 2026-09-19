import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const faea = {
  id: "01a0b70a-7919-7f48-8bea-a153e4c78c37",
  type: "page-type/world-character",
  slug: "faea",
  title: "Faea",
  world: "world/the-wandering-inn",
  firstChapter: 799,
  lastChapter: 799,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
