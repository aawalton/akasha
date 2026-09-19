import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lamont = {
  id: "01a0b70b-7ab6-7d83-b152-6803afe00c18",
  type: "page-type/world-character",
  slug: "lamont",
  title: "Lamont",
  world: "world/the-wandering-inn",
  firstChapter: 311,
  lastChapter: 591,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
