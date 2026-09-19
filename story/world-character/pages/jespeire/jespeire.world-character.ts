import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const jespeire = {
  id: "01a0b70b-1f6a-72e5-ab54-265e2ea285e9",
  type: "page-type/world-character",
  slug: "jespeire",
  title: "Jespeire",
  world: "world/the-wandering-inn",
  firstChapter: 591,
  lastChapter: 591,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
