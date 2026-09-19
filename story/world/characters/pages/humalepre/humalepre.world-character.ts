import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const humalepre = {
  id: "01a0b70b-025b-7978-9fee-9a6d0dc5db68",
  type: "page-type/world-character",
  slug: "humalepre",
  title: "Humalepre",
  world: "world/the-wandering-inn",
  firstChapter: 695,
  lastChapter: 695,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
